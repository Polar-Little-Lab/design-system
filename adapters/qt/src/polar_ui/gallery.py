"""Interactive component catalogue; intentionally independent of Polarzip."""
import sys
from PySide6.QtCore import Qt
from PySide6.QtWidgets import QApplication, QWidget, QVBoxLayout, QHBoxLayout, QLabel, QFrame
from . import Button, TextInput, Checkbox, Select, Field, stylesheet, COLORS

class Gallery(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Polar UI · Component Gallery")
        self.resize(900, 730)
        self.setObjectName("gallery")
        layout = QVBoxLayout(self)
        layout.setContentsMargins(32, 28, 32, 28)
        layout.setSpacing(24)
        title = QLabel("Polar UI")
        title.setStyleSheet("font-size:28px;font-weight:700")
        layout.addWidget(title)
        layout.addWidget(QLabel("제품마다 다시 만들지 않는 기본 요소 · Frost / Qt"))
        buttons = QHBoxLayout()
        for title, variant in [("계속", "primary"), ("취소", "secondary"), ("자세히", "ghost"), ("삭제", "danger")]:
            buttons.addWidget(Button(title, variant=variant))
        disabled = Button("사용할 수 없음")
        disabled.setEnabled(False)
        buttons.addWidget(disabled)
        layout.addLayout(buttons)
        fields = QHBoxLayout()
        self.select = Select()
        self.select.addOption("AES-256 · 권장", "aes256", "256비트 · 파일 내용을 암호화")
        self.select.addOption("AES-192", "aes192", "192비트 AES 암호화")
        self.select.addOption("AES-128", "aes128", "128비트 AES 암호화")
        self.select.addOption("암호 없음", "none", "암호 없이 누구나 열 수 있음")
        fields.addWidget(Field("선택 메뉴", self.select), 1)
        unavailable = Select()
        unavailable.addOption("작업 중", "busy")
        unavailable.setEnabled(False)
        fields.addWidget(Field("비활성 상태", unavailable), 1)
        layout.addLayout(fields)
        inputs = QHBoxLayout()
        name = TextInput()
        name.setPlaceholderText("예: 공유할 자료")
        inputs.addWidget(Field("파일 이름", name, "확장자는 선택한 형식으로 붙습니다."), 1)
        secret = TextInput()
        secret.setEchoMode(TextInput.EchoMode.Password)
        invalid = Field("암호 확인", secret)
        invalid.setError("입력한 암호가 일치하지 않습니다.")
        inputs.addWidget(invalid, 1)
        layout.addLayout(inputs)
        checks = QHBoxLayout()
        for title, checked, enabled in [("선택 안 됨",False,True),("선택됨",True,True),("비활성",True,False)]:
            check = Checkbox(title)
            check.setChecked(checked)
            check.setEnabled(enabled)
            checks.addWidget(check)
        layout.addLayout(checks)
        self.status = QLabel("메뉴를 열고 ↑ ↓ · Enter · Esc로 조작해 보세요.")
        self.status.setWordWrap(True)
        layout.addWidget(self.status)
        self.select.currentIndexChanged.connect(lambda _: self.status.setText("선택한 값: "+str(self.select.currentData())))
        layout.addStretch()
        layout.addWidget(QLabel("포커스 · 호버 · 펼침 · 선택 · 오류 · 비활성 상태를 실제 컨트롤로 확인합니다."))

def main():
    app = QApplication.instance() or QApplication(sys.argv)
    app.setStyle("Fusion")
    app.styleHints().setColorScheme(Qt.ColorScheme.Light)
    app.setStyleSheet("QWidget{font-family:'Apple SD Gothic Neo','Malgun Gothic';font-size:13px;color:"+COLORS["text"]+"} QWidget#gallery{background:"+COLORS["canvas"]+"} QLabel{background:transparent}"+stylesheet())
    window = Gallery()
    window.show()
    return app.exec()

if __name__ == "__main__":
    raise SystemExit(main())
