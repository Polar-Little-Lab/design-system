import os
os.environ.setdefault("QT_QPA_PLATFORM", "offscreen")
import unittest
from PySide6.QtCore import Qt, QPoint, QPointF
from PySide6.QtGui import QWheelEvent
from PySide6.QtTest import QTest
from PySide6.QtWidgets import QApplication, QWidget, QVBoxLayout, QStyle
from polar_ui import Button, TextInput, Select, Field, stylesheet

class ControlsTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.app = QApplication.instance() or QApplication([])
        cls.app.setStyle("Fusion")
        cls.app.setStyleSheet(stylesheet())

    def setUp(self):
        self.window = QWidget()
        self.layout = QVBoxLayout(self.window)
        self.select = Select()
        self.select.addOption("권장", "recommended", "기본 선택")
        self.select.addOption("다른 값", "other", "설명")
        self.layout.addWidget(Field("암호화", self.select))
        self.window.show()
        self.app.processEvents()

    def tearDown(self):
        self.select.hidePopup()
        self.window.close()
        self.window.deleteLater()
        self.app.processEvents()

    def test_popup_keyboard_accept_and_escape_without_commit(self):
        self.select.setFocus()
        QTest.keyClick(self.select, Qt.Key.Key_Space)
        self.assertTrue(self.select.view().isVisible())
        QTest.keyClick(self.select.view(), Qt.Key.Key_Down)
        QTest.keyClick(self.select.view(), Qt.Key.Key_Escape)
        self.assertEqual(self.select.currentData(), "recommended")
        QTest.keyClick(self.select, Qt.Key.Key_Return)
        QTest.keyClick(self.select.view(), Qt.Key.Key_Down)
        QTest.keyClick(self.select.view(), Qt.Key.Key_Return)
        self.assertEqual(self.select.currentData(), "other")

    def test_popup_mouse_selection_preserves_data(self):
        self.select.showPopup()
        self.app.processEvents()
        index = self.select.model().index(1, 0)
        QTest.mouseClick(self.select.view().viewport(), Qt.MouseButton.LeftButton,
                         pos=self.select.view().visualRect(index).center())
        self.assertEqual(self.select.currentData(), "other")
        self.assertFalse(self.select.view().isVisible())

    def test_wheel_does_not_change_value_and_disabled_popup_stays_closed(self):
        event = QWheelEvent(QPointF(10, 10), QPointF(10, 10), QPoint(),
                            QPoint(0, -120), Qt.MouseButton.NoButton,
                            Qt.KeyboardModifier.NoModifier, Qt.ScrollPhase.NoScrollPhase, False)
        self.app.sendEvent(self.select, event)
        self.assertEqual(self.select.currentData(), "recommended")
        self.select.setEnabled(False)
        self.select.showPopup()
        self.assertFalse(self.select.view().isVisible())

    def test_no_native_menu_and_accessibility_labels(self):
        self.assertEqual(self.select.style().styleHint(QStyle.StyleHint.SH_ComboBox_Popup, None, self.select), 0)
        self.assertEqual(self.select.accessibleName(), "암호화")
        self.assertIn("기본 선택", self.select.itemData(0, Qt.ItemDataRole.AccessibleTextRole))

    def test_input_error_and_button_disabled(self):
        control = TextInput()
        field = Field("암호", control, "8자 이상")
        field.setError("서로 다릅니다")
        self.assertTrue(control.property("invalid"))
        self.assertEqual(control.accessibleDescription(), "서로 다릅니다")
        field.setError("")
        self.assertFalse(control.property("invalid"))
        self.assertEqual(field.message.text(), "8자 이상")
        button = Button("실행", variant="primary")
        clicks = []
        button.clicked.connect(lambda: clicks.append(True))
        button.setEnabled(False)
        button.click()
        self.assertEqual(clicks, [])

    def test_busy_button_restores_text_and_preexisting_disabled_state(self):
        button = Button("압축")
        button.setBusy(True)
        self.assertFalse(button.isEnabled())
        self.assertEqual(button.text(), "처리 중…")
        button.setBusy(False)
        self.assertTrue(button.isEnabled())
        self.assertEqual(button.text(), "압축")
        button.setEnabled(False)
        button.setBusy(True)
        button.setBusy(False)
        self.assertFalse(button.isEnabled())
