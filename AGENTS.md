# Polar UI 개발 지침

- docs/AI_HANDOFF.md, docs/COMPONENTS.md, docs/DEVELOPMENT.md를 먼저 읽는다.
- 토큰은 tokens/frost.json에서 변경하고 npm run tokens로 양쪽 어댑터에 반영한다.
- 새 컴포넌트나 동작 변경에는 상태 스토리와 의미 있는 상호작용 테스트를 추가한다.
- 입력·암호·실제 사용자 데이터를 예제 로그나 네트워크에 전송하지 않는다.
- React와 Qt가 모두 구현됐다고 추정하지 않는다. docs/STATUS.md에 실제 범위를 기록한다.
- npm run build와 npm test를 확인하고, Qt 변경 시 어댑터 테스트도 실행한다.
- AI_HANDOFF.md를 바꾸면 public/AI_HANDOFF.md도 갱신한다.
- 요청 없는 공개 전환, npm 게시, 공개 호스팅을 하지 않는다.
