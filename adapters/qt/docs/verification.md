# 검증 기록 · 0.1.0 / Polarzip 0.2.1

2026-10-25, macOS 로컬 환경.

- 공통 컴포넌트 테스트 6개 통과: 팝업 키보드 수락·Escape 취소, 마우스 선택, 휠 방지, 비활성, 접근성 이름, 오류·busy 상태.
- Polarzip 기존 기능 테스트 36개 통과.
- 독립 wheel 빌드 성공: polar_ui-0.1.0-py3-none-any.whl.
- Polarzip PyInstaller 빌드, --smoke-test, --archive-self-test 및 codesign --verify --deep --strict 통과.
- 갤러리와 펼친 메뉴를 실제 Qt 위젯으로 오프스크린 렌더링해 확인.
- 네이티브 Polarzip에서 Tab 포커스 이동, 형식·암호화 키보드 선택과 필드 표시 확인.
- 자동화 도구의 네이티브 마우스 클릭 호출은 오류가 발생했습니다. 마우스 선택은 Qt QTest에서 검증했으며 실제 OS 클릭 검증과 구분합니다.
- Windows CI 구성은 갱신했지만 실행 결과를 확인하지 않았습니다. 스크린 리더 실기기 검증도 미수행입니다.

렌더 자료: ../artifacts가 아닌 패키지 루트 artifacts/gallery.png, artifacts/select-open.png.
소비 앱 네이티브 캡처: 저장소 루트 artifacts/native-0.2.1.png.
