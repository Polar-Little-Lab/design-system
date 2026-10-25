# 디자인 토큰과 아이콘

## Frost

원본은 tokens/frost.json입니다. npm run tokens로 React CSS와 Qt JSON 사본을 함께 생성합니다.
색상은 직접 복사하지 않고 의미별 변수를 사용합니다.

| 역할 | 값 | 용도 |
|---|---|---|
| canvas | #f3f8fc | 작업 화면 |
| surface | #ffffff | 입력·카드·팝업 |
| soft | #e7eff6 | 보조 표면·선택 |
| text | #213347 | 본문 |
| muted | #586d80 | 설명 |
| border | #c8d8e5 | 경계 |
| accent | #32678c | 주요 실행·포커스 |
| danger | #b44848 | 오류·위험 |
| success | #287761 | 성공 |
| warning | #94601f | 주의 |

간격은 4·8·12·16·24·32px, 컨트롤 높이 40px, 기본 모서리 8px, 팝업 10px, 포커스 2px입니다.
입력 라벨 12px, 컨트롤 본문 13px, 설명 11–12px를 기본으로 합니다.
웹 레이아웃은 620px 이하에서 필드를 한 열로 배치합니다.
Frost 이외 테마는 아직 없습니다.

## 아이콘

웹 기능 아이콘은 Lucide React를 사용합니다. 24px 그리드·1.8px 획, 컨트롤에서는 16–18px가 기본입니다.
의미가 중복되는 아이콘을 나열하지 않습니다. 아이콘 단독 버튼에는 접근성 이름과 툴팁을 제공합니다.
기능 아이콘을 이모지나 문자 화살표로 대체하지 않습니다.
제품 앱 아이콘은 별도 자산입니다. Polarsh의 터미널 표식과 Polarzip의 압축 표식을 같은 아이콘으로 합치지 않습니다.

## 출처

- Storybook: https://storybook.js.org/docs
- Radix Select: https://www.radix-ui.com/primitives/docs/components/select
- Lucide: https://lucide.dev
- Qt 어댑터: adapters/qt/src/polar_ui

공개 배포 전 의존성별 라이선스와 조직의 자산 공개 범위를 확인합니다.
