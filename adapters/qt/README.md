# Polar UI / Qt 어댑터

Polarzip의 polar-ui 0.1.0에서 가져온 독립 Python 패키지입니다.
이 저장소의 tokens/frost.json이 토큰의 기준이며 npm run tokens로 Qt 사본도 갱신합니다.

```sh
python -m pip install -e adapters/qt
polar-ui-gallery
python -m unittest discover -s adapters/qt/tests -v
```

Python 3.13+, PySide6-Essentials 6.12.0.
Qt 컨트롤 API는 docs/components.md, 개발 규칙은 docs/development.md에 있습니다.
React Storybook은 Qt 위젯을 직접 실행하지 않습니다. 같은 계약의 웹 구현을 보여줍니다.
Qt를 수정하면 Qt 테스트와 소비 앱 빌드도 별도로 확인해야 합니다.
