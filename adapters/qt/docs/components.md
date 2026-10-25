# 컴포넌트 계약 · 0.1.0

| 요소 | API | 책임 |
|---|---|---|
| Button | variant=primary/secondary/ghost/danger, setBusy(bool) | 눌림·포커스·비활성·작업 중 표시 |
| Select | addOption(title, value, description), currentData(), currentIndexChanged | 단일 값 선택, 설명·선택 체크, Qt 팝업 |
| TextInput | QLineEdit API, setInvalid(bool) | 텍스트·암호 마스킹·오류 테두리 |
| Checkbox | QCheckBox API | 독립적인 켜기/끄기 |
| Field | Field(label, control, helper), setError(message) | 영구 라벨·접근성 이름·설명·오류 |

## Select

- 비편집형 단일 선택 전용입니다. 검색·다중 선택은 지원하지 않습니다.
- 닫혔을 때 선택한 문구와 펼침 아이콘을 보여줍니다.
- 펼치면 옵션 제목, 선택적 설명, 현재 값의 체크 표시를 보여줍니다.
- Space·Enter로 열기, 방향키로 이동, Enter로 수락, Escape로 취소합니다.
- 마우스로 선택하거나 바깥을 누르면 닫힙니다. Qt 팝업의 기본 외부 클릭 처리를 사용합니다.
- 휠 스크롤은 닫힌 컨트롤의 값을 바꾸지 않습니다.
- 긴 설명은 한 줄로 줄이고 툴팁·접근성 텍스트에 원문을 유지합니다.
- 기본 표시량은 7개. 긴 목록은 스크롤합니다.
- QComboBox의 data/signal API를 유지합니다. 값 비교에 번역된 제목을 사용하지 않습니다.

## Button

setBusy(True)는 기존 문구·활성 상태를 기억하고 중복 실행을 막습니다.
setBusy(False)는 원래 상태를 복원합니다. 애초에 비활성인 버튼을 임의로 활성화하지 않습니다.
작업 중 다른 로직에서 활성 상태를 변경해야 한다면 busy 해제 후 최종 상태를 적용합니다.

## Field와 TextInput

setError는 오류 문구·접근성 설명·입력 테두리를 갱신합니다. 빈 문자열로 지우면 원래 helper가 돌아옵니다.
오류 메시지에는 비밀번호·토큰 등 입력한 비밀 값을 넣지 않습니다.
Field는 레이아웃 그룹이며 숨길 때 컨트롤만 숨기지 말고 Field 전체를 숨깁니다.
