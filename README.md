# Polar UI · Design system

Polar 제품군의 **문서 + 실제 컴포넌트 + Storybook + 상호작용 테스트**입니다.
다른 ChatGPT·Codex 세션에서도 같은 기준을 적용할 수 있도록 AI 전달 자료를 함께 관리합니다.

## 지금 바로 테스트하기

**[Storybook 웹에서 열기](https://polar-little-lab.github.io/design-system/)** — 설치나 로그인 없이 사용할 수 있습니다.

로컬 개발 주소는 http://127.0.0.1:6006 입니다.

다른 컴퓨터에서는 Node.js 22.12 이상을 설치한 뒤:

```sh
git clone https://github.com/Polar-Little-Lab/design-system.git
cd design-system
npm ci
npm run storybook
```

Windows PowerShell과 macOS Terminal에서 같은 명령을 사용합니다.
브라우저에서 http://localhost:6006 을 엽니다.

설치 없이 브라우저에서 사용하려면 GitHub 저장소의 **Code → Codespaces → Create codespace on main**을 선택할 수 있습니다.
개발 환경 설정은 포함돼 있으며, 개인·조직의 Codespaces 사용 권한과 할당량이 필요합니다. 6006 포트는 비공개로 사용하세요.

> 저장소와 Storybook은 공개입니다. main의 웹·Qt 검증이 통과하면 GitHub Pages가 자동 갱신됩니다.
> GitHub Actions는 정적 Storybook 빌드 파일도 제공합니다.

## 무엇을 눌러볼 수 있나요?

| 메뉴 | 내용 |
|---|---|
| Start here / Overview | 버튼 클릭 횟수, 실제 선택·입력·체크박스 |
| Foundations | Frost 색상, 간격·크기, Lucide 아이콘 |
| Components / Button | 주요·보조·위험·비활성·처리 중 |
| Components / Select | 설명·선택 표시, 긴 목록, 키보드, 비활성·오류 |
| Components / TextField | 입력·암호·오류·비활성 |
| Components / Checkbox | 클릭·Space 전환, 설명·비활성 |
| Components / Notice | 안내·성공·주의 |
| Patterns / Archive settings | 형식 전환, 암호 확인, 오류·성공 흐름 |
| Reference | 사용법과 AI 전달 방법 |

**Controls**에서 속성을 바꾸고, **Accessibility**의 Run test 버튼으로 접근성 진단을 실행하세요.
KeyboardContract·ValidationContract 스토리는 play 함수로 동작을 검증합니다.
실제 압축·SSH·키체인 요청이나 파일 삭제는 하지 않습니다.

## 다른 AI 세션에 전달하기

1. [AI_HANDOFF.md](docs/AI_HANDOFF.md)를 다운로드해 ChatGPT 대화·프로젝트에 첨부합니다.
2. [시작 프롬프트](docs/START_PROMPT.md)를 붙여넣습니다.
3. 코드를 수정해야 한다면 저장소 접근 권한이나 관련 소스도 제공합니다.

공개 링크라도 대화 환경에 따라 읽을 수 없을 수 있으므로 전달 문서를 첨부하는 방법도 제공합니다.
문서에 없는 이전 대화 내용을 알고 있다고 가정하지 않도록 구현 범위와 검증 상태를 함께 전달합니다.

## 개발과 검증

```sh
npm run build
npx playwright install chromium
npm test
npm run preview
```

CI에서는 Chromium 설치 시 `npx playwright install --with-deps chromium`를 사용합니다.
정적 빌드는 `storybook-static`에 생성됩니다. HTML을 파일로 직접 여는 대신 HTTP 서버로 제공해야 합니다.

- [컴포넌트 계약](docs/COMPONENTS.md)
- [개발 규칙](docs/DEVELOPMENT.md)
- [디자인 토큰·아이콘](docs/FOUNDATIONS.md)
- [구현·검증 현황](docs/STATUS.md)
- [Qt 어댑터](adapters/qt/README.md)
- [변경 이력](CHANGELOG.md)

현재 npm/PyPI에 게시하지 않았습니다. React 컴포넌트는 `src/components`, Qt 컴포넌트는 `adapters/qt`에 있습니다.
Polarzip의 기존 Qt 구현을 이 저장소에 가져왔습니다. 소비 앱이 자동으로 이 저장소와 동기화되는 것은 아닙니다.

## 빌드 파일만 받기

[0.1.0 릴리스](https://github.com/Polar-Little-Lab/design-system/releases/tag/v0.1.0)의 Storybook ZIP을 풀고 START_HERE.txt를 따르세요.
Python이 설치돼 있다면 해당 폴더에서 `python3 -m http.server 6006 --bind 127.0.0.1`로 실행할 수 있습니다.
Windows는 `py -m http.server 6006 --bind 127.0.0.1`을 사용합니다.
npm 설치 없이 빌드된 화면을 시험할 수 있지만, 로컬 HTTP 서버는 필요합니다.
