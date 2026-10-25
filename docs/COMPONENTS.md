# 컴포넌트 계약

## Button

variant: primary / secondary / ghost / danger. loading은 비활성·aria-busy를 함께 적용합니다.
주요 실행은 화면 영역당 하나를 우선합니다. 기본 type은 button이며 폼 제출만 submit으로 지정합니다.
컴포넌트는 실제 저장·삭제를 수행하지 않습니다.

## Select

options: {value, label, description?, disabled?} 배열.
value + onValueChange로 제어하거나 defaultValue로 비제어형으로 사용합니다. 둘을 혼합하지 않습니다.
번역 문구가 아닌 value로 로직을 비교합니다. 빈 value는 placeholder용으로 예약돼 있습니다.
Space/Enter로 열기, 방향키 이동, Enter 선택, Escape 취소·포커스 복귀, 문자 입력으로 항목 찾기를 지원합니다.
닫힌 컨트롤의 휠 스크롤이 값을 바꾸지 않습니다.
Radix의 포털·충돌 감지·포커스 관리를 사용합니다. 팝업은 화면 경계를 넘지 않으며 긴 목록은 스크롤합니다.
멀티 선택과 검색형 콤보박스는 아직 제공하지 않습니다.

## TextField

영구 label, helper, error를 제공합니다. 오류는 aria-invalid·aria-describedby로 입력과 연결됩니다.
type=password를 지원합니다. 암호 표시 토글은 제품 흐름에서 구성합니다.
입력 값을 로그·localStorage·네트워크에 기록하지 않습니다.

## Checkbox

독립적인 켜기/끄기에 사용합니다. 라벨 클릭과 Space를 지원합니다.
서로 배타적인 단일 선택을 체크박스 묶음으로 구현하지 않습니다.
description을 접근성 설명으로 연결합니다.

## Notice

info / success / warning 상태를 제공합니다. role=status로 상태 변경을 알립니다.
중요한 실패를 무조건 자동으로 사라지게 하지 않습니다.
토스트·알림센터·자동 종료 타이머는 아직 공통 컴포넌트로 구현하지 않았습니다.

## Archive settings

실제 압축 기능이 아닌 UI 검증용 패턴입니다.
형식 변경에 따라 유효한 AES 선택을 유지하고, 암호 불일치를 필드에 표시합니다.
실제 파일·암호화 엔진·키체인 연결은 소비 앱에서 구현해야 합니다.
