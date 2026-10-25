# 구현·검증 현황
기준: 0.1.0 / 2026-10-25

## 구현

- Storybook 10.6.3 + React + Vite, Frost 테마.
- 실제 조작 가능한 스토리 25개, 문서 페이지 8개.
- Button, Select, TextField, Checkbox, Notice 및 Archive settings UI 패턴.
- Controls, Actions, Interactions, Accessibility 패널.
- AI 전달 Markdown 다운로드, 새 대화용 시작 프롬프트.
- Qt 어댑터 0.1.0, 공통 토큰 생성.
- GitHub Actions 빌드·브라우저·Qt 테스트와 정적 사이트 artifact.
- Codespaces 실행 환경 설정.

## 로컬 검증

- TypeScript 검사와 정적 Storybook 빌드 통과.
- Chromium Playwright 테스트 11개 통과.
- Qt 테스트 6개 통과.
- Overview의 axe WCAG A/AA 자동 검사 통과.
- 실제 브라우저에서 Storybook 메인 화면을 확인했습니다.
- 모든 컴포넌트의 모든 상태에 대해 수동 스크린 리더 검증을 완료한 것은 아닙니다.

## 미구현·미검증

- 공개 웹 호스팅, npm/PyPI 게시.
- Windows 실기기, Safari/WebKit·Firefox 전체 동작, VoiceOver/NVDA 검사.
- 다크 테마·멀티 선택·검색형 콤보박스·공통 토스트.
- Polarsh에 새 React 컨트롤 적용.
- Storybook에서 실제 압축·SSH·키체인 기능 실행.
- Codespaces 실제 실행: 설정만 포함했고 클라우드 환경을 생성하지 않았습니다.

React와 Qt는 같은 계약을 따르는 별도 구현입니다. Qt 코드를 브라우저에서 직접 실행하는 것은 아닙니다.
