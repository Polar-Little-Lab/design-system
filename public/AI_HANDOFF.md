# Polar UI — 새 AI 세션 전달 자료
버전 0.1.0 · 2026-10-25
저장소: https://github.com/Polar-Little-Lab/design-system

이 문서는 이전 대화를 읽을 수 없는 ChatGPT·Codex가 사용할 독립적인 개발 기준입니다.
저장소와 Storybook은 공개입니다. 웹: https://polar-little-lab.github.io/design-system/
링크에 접근할 수 없는 환경이면 문서를 첨부받고, 읽은 척하거나 이전 세션 상태를 추정하지 마세요.

## 목적
Polar 제품군에서 버튼·선택 메뉴·입력·체크박스와 상태 표현을 재사용합니다.
문서만 만들지 않고 실행 가능한 컴포넌트, Storybook, 테스트를 함께 유지합니다.
제품의 주 작업을 화면 중심에 배치하고 중복된 내비게이션과 내부 구현 설명을 줄입니다.

## 현재 구현
- React: Button, Select, TextField, Checkbox, Notice. src/components에 있습니다.
- Qt: Button, Select, TextInput, Checkbox, Field. adapters/qt에 독립 Python 패키지가 있습니다.
- Storybook: Overview, Tokens & icons, 각 컨트롤의 상태, 압축 설정 UI 패턴, Reference 문서.
- 웹 선택 메뉴는 Radix Select 기반입니다. Qt 선택 메뉴는 Qt 리스트 팝업입니다.
- 실제 압축·SSH·키체인은 디자인 시스템에 없습니다. ArchiveForm은 UI 검증 예제입니다.
- Polarzip에서 가져온 Qt 구현이 포함돼 있지만 소비 앱은 자동 동기화되지 않습니다.
- Polarsh에 새 React 컴포넌트를 적용한 상태는 아닙니다.
- 다크 테마, 멀티 선택, 검색형 콤보박스, 공통 토스트는 아직 없습니다.
- Windows·VoiceOver·NVDA 실기기 검증 완료를 가정하지 마세요.

## Frost 기준
canvas #f3f8fc / surface #ffffff / soft #e7eff6
text #213347 / muted #586d80 / border #c8d8e5
accent #32678c / danger #b44848 / success #287761 / warning #94601f
간격 4·8·12·16·24·32px, 컨트롤 40px, 모서리 8px, 팝업 10px, 포커스 2px.
라벨 12px, 컨트롤 13px, 설명 11–12px. 원본은 tokens/frost.json.
웹 아이콘은 Lucide, 24px 그리드·1.8px 획. 제품 앱 아이콘과 기능 아이콘을 구분합니다.

## 컴포넌트 사용
- Button: variant=primary|secondary|ghost|danger, loading, disabled. 기본 type=button.
- Select: label, options[{value,label,description?,disabled?}], value/onValueChange 또는 defaultValue.
- TextField: label, helper, error와 HTML input 속성. type=password 지원.
- Checkbox: label, description, checked/onChange 또는 defaultChecked.
- Notice: tone=info|success|warning, title, children.
- Qt API는 adapters/qt/docs/components.md에서 확인합니다.

React 예:
```tsx
import {Select, Button} from './components';
<Select label="형식" value={format} onValueChange={setFormat}
 options={[{value:'zip',label:'ZIP',description:'일반적인 파일 공유'},
           {value:'7z',label:'7z',description:'파일명 암호화 가능'}]}/>
<Button variant="primary" type="submit">압축</Button>
```
위 import 경로는 예시입니다. 실제 프로젝트의 export 경로에 맞추세요. npm에 게시된 패키지가 있다고 가정하지 마세요.

## 동작 규칙
- placeholder만으로 필드를 설명하지 않습니다. 라벨은 입력 후에도 남습니다.
- Select는 펼친 목록까지 디자인합니다. 현재 값 체크, 옵션 설명, 호버·포커스를 구분합니다.
- Space/Enter 열기, 방향키 이동, Enter 수락, Escape 취소와 포커스 복귀를 유지합니다.
- 페이지 스크롤이 설정값을 바꾸지 않아야 합니다.
- 비활성·작업 중 상태에서 중복 실행을 막습니다. 취소까지 막지 않습니다.
- 오류는 해당 필드와 연결합니다. 비밀번호 등 입력한 비밀을 오류 문구에 넣지 않습니다.
- 아이콘만 있는 버튼에는 접근성 이름을 제공합니다.
- 파괴적 동작·보안 정책은 소비 앱이 관리합니다.
- 기본 레이아웃은 작은 화면에서 한 열로 전환합니다.

## 작업 순서
1. 기존 코드와 COMPONENTS.md를 확인합니다.
2. 공통 컴포넌트를 우선 사용합니다. 앱별 임시 CSS를 반복해서 만들지 않습니다.
3. 없는 API는 상태·계약을 먼저 정리하고 구현합니다.
4. Storybook 스토리와 필요한 상호작용 테스트를 추가합니다.
5. npm run build, npm test를 실행합니다.
6. 변경 내용과 구현/미구현 상태를 이 문서·CHANGELOG.md에 반영합니다.
7. 검증한 사실과 추정을 구분해 보고합니다.

실행: npm ci → npm run storybook → http://localhost:6006
테스트: npm run build → npx playwright install chromium → npm test
Qt 갤러리: pip install -e adapters/qt → polar-ui-gallery

현재 이 문서의 기준은 저장소 0.1.0입니다. 후속 작업에서는 최신 커밋·변경 이력을 확인하세요.
