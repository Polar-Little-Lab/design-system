from PySide6.QtCore import Qt, QSize, QPointF
from PySide6.QtGui import QColor, QFont, QPainter, QPen, QPolygonF
from PySide6.QtWidgets import (QPushButton, QLineEdit, QCheckBox, QComboBox, QListView,
                               QStyledItemDelegate, QStyle, QProxyStyle, QWidget, QVBoxLayout, QLabel)
from .theme import COLORS, TOKENS

DESCRIPTION = int(Qt.ItemDataRole.UserRole) + 1

class Button(QPushButton):
    def __init__(self, *args, variant="secondary", **kwargs):
        super().__init__(*args, **kwargs)
        if self.objectName() == "primary":
            variant = "primary"
        self._busy_state = None
        self.setMinimumHeight(TOKENS["control"]["height"])
        self.setProperty("polarControl", "button")
        self.setProperty("polarVariant", variant)
        self.setFocusPolicy(Qt.FocusPolicy.StrongFocus)
        self.setCursor(Qt.CursorShape.PointingHandCursor)

    def setBusy(self, busy, label="처리 중…"):
        if busy and self._busy_state is None:
            self._busy_state = (self.text(), self.isEnabled())
            self.setText(label)
            self.setEnabled(False)
        elif not busy and self._busy_state is not None:
            text, enabled = self._busy_state
            self._busy_state = None
            self.setText(text)
            self.setEnabled(enabled)

class TextInput(QLineEdit):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.setProperty("polarControl", "input")
        self.setMinimumHeight(TOKENS["control"]["height"])

    def setInvalid(self, invalid):
        self.setProperty("invalid", bool(invalid))
        self.style().unpolish(self)
        self.style().polish(self)

class Checkbox(QCheckBox):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.setProperty("polarControl", "checkbox")
        self.setFocusPolicy(Qt.FocusPolicy.StrongFocus)

class _PopupStyle(QProxyStyle):
    def styleHint(self, hint, option=None, widget=None, returnData=None):
        if hint == QStyle.StyleHint.SH_ComboBox_Popup:
            return 0  # Use the same Qt list on macOS and Windows, never the native menu.
        return super().styleHint(hint, option, widget, returnData)

class _OptionDelegate(QStyledItemDelegate):
    def __init__(self, select):
        super().__init__(select)
        self.select = select

    def sizeHint(self, option, index):
        return QSize(260, TOKENS["control"]["optionHeight"] if index.data(DESCRIPTION) else 40)

    def paint(self, painter, option, index):
        painter.save()
        painter.setRenderHint(QPainter.RenderHint.Antialiasing)
        active = bool(option.state & QStyle.StateFlag.State_Selected)
        enabled = bool(index.flags() & Qt.ItemFlag.ItemIsEnabled)
        rect = option.rect.adjusted(2, 2, -2, -2)
        if active:
            painter.setPen(Qt.PenStyle.NoPen)
            painter.setBrush(QColor(COLORS["soft"]))
            painter.drawRoundedRect(rect, 6, 6)
        title = str(index.data() or "")
        description = str(index.data(DESCRIPTION) or "")
        area = rect.adjusted(12, 0, -34, 0)
        font = QFont(option.font)
        font.setPixelSize(13)
        font.setWeight(QFont.Weight.DemiBold)
        painter.setFont(font)
        painter.setPen(QColor(COLORS["text"] if enabled else COLORS["disabled"]))
        title_rect = area.adjusted(0, 5, 0, -24) if description else area
        painter.drawText(title_rect, Qt.AlignmentFlag.AlignVCenter, painter.fontMetrics().elidedText(title, Qt.TextElideMode.ElideRight, area.width()))
        if description:
            font.setPixelSize(11)
            font.setWeight(QFont.Weight.Normal)
            painter.setFont(font)
            painter.setPen(QColor(COLORS["muted"]))
            painter.drawText(area.adjusted(0, 23, 0, -4), Qt.AlignmentFlag.AlignVCenter, painter.fontMetrics().elidedText(description, Qt.TextElideMode.ElideRight, area.width()))
        if index.row() == self.select.currentIndex():
            x, y = rect.right()-19, rect.center().y()
            painter.setPen(QPen(QColor(COLORS["accent"]), 1.8))
            painter.drawPolyline(QPolygonF([QPointF(x-5,y),QPointF(x-1,y+4),QPointF(x+6,y-4)]))
        painter.restore()

class Select(QComboBox):
    """Non-editable single select; standard Qt signals/data API are preserved."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.setProperty("polarControl", "select")
        self.setMinimumHeight(TOKENS["control"]["height"])
        self.setFocusPolicy(Qt.FocusPolicy.StrongFocus)
        self._popup_style = _PopupStyle("Fusion")
        self._popup_style.setParent(self)
        self.setStyle(self._popup_style)
        view = QListView()
        view.setProperty("polarControl", "options")
        view.setUniformItemSizes(False)
        view.setHorizontalScrollBarPolicy(Qt.ScrollBarPolicy.ScrollBarAlwaysOff)
        view.setVerticalScrollMode(QListView.ScrollMode.ScrollPerPixel)
        self.setView(view)
        self.setItemDelegate(_OptionDelegate(self))
        self.setMaxVisibleItems(7)
        self.setMinimumWidth(150)

    def addOption(self, title, value, description=""):
        self.addItem(title, value)
        self.setItemData(self.count()-1, description, DESCRIPTION)
        self.setItemData(self.count()-1, title+(" — "+description if description else ""), Qt.ItemDataRole.AccessibleTextRole)
        self.setItemData(self.count()-1, description, Qt.ItemDataRole.ToolTipRole)

    def wheelEvent(self, event):
        # Scrolling a settings page must not silently change its values.
        event.ignore()

    def keyPressEvent(self, event):
        if event.key() in (Qt.Key.Key_Space, Qt.Key.Key_Return, Qt.Key.Key_Enter):
            self.showPopup()
            event.accept()
            return
        super().keyPressEvent(event)

    def showPopup(self):
        if not self.isEnabled() or not self.count():
            return
        self.view().setMinimumWidth(max(self.width(), 280))
        super().showPopup()

class Field(QWidget):
    def __init__(self, label, control, helper="", parent=None):
        super().__init__(parent)
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(TOKENS["space"]["sm"])
        self.label = QLabel(label)
        self.label.setProperty("polarControl", "label")
        self.label.setBuddy(control)
        control.setAccessibleName(label)
        layout.addWidget(self.label)
        layout.addWidget(control)
        self.helper_text = helper
        self.message = QLabel(helper)
        self.message.setProperty("polarControl", "helper")
        self.message.setWordWrap(True)
        self.message.setVisible(bool(helper))
        layout.addWidget(self.message)
        self.control = control

    def setError(self, message):
        self.message.setText(message or self.helper_text)
        self.message.setVisible(bool(message or self.helper_text))
        self.message.setProperty("polarControl", "error" if message else "helper")
        self.message.style().unpolish(self.message)
        self.message.style().polish(self.message)
        self.control.setAccessibleDescription(message)
        if hasattr(self.control, "setInvalid"):
            self.control.setInvalid(bool(message))
