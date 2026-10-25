import type {Meta,StoryObj} from '@storybook/react-vite';
import {useState} from 'react';
import {Button} from '../components/Button';
import {Select} from '../components/Select';
import {TextField} from '../components/TextField';
import {Checkbox} from '../components/Checkbox';
import {Notice} from '../components/Notice';
function Overview(){
 const [value,setValue]=useState('zip'),[count,setCount]=useState(0);
 return <main className="catalog">
 <header className="catalog-header"><div><p className="eyebrow">POLAR / INTERFACE LIBRARY</p><h1>보고, 눌러보고,<br/>같은 기준으로 만드세요.</h1><p>Polar 제품군의 실제 컴포넌트와 개발 규칙입니다.<br/>아래 요소를 직접 조작하거나 왼쪽 메뉴에서 각 상태를 살펴보세요.</p></div><span className="version">0.1.0 · Frost</span></header>
 <section className="catalog-card"><h2>01 / 실행과 피드백</h2><p>버튼의 강조, 비활성, 처리 중 상태를 비교합니다.</p><div className="polar-inline"><Button variant="primary" onClick={()=>setCount(n=>n+1)}>눌러보기</Button><Button>보조 작업</Button><Button variant="ghost">자세히</Button><Button disabled>사용 불가</Button><Button loading>처리 중</Button><span className="badge" aria-live="polite">{count}회 클릭</span></div></section>
 <section className="catalog-card"><h2>02 / 선택과 입력</h2><p>메뉴를 펼친 뒤 방향키와 Enter, Escape를 사용해 보세요.</p><div className="polar-grid"><Select label="압축 형식" value={value} onValueChange={setValue} options={[{value:'zip',label:'ZIP',description:'일반적인 파일 공유'},{value:'7z',label:'7z',description:'파일명까지 암호화 가능'}]} helper={'선택된 값: '+value}/><TextField label="이름" placeholder="예: 공유할 자료" helper="라벨은 입력 후에도 남습니다."/></div><div style={{marginTop:20}}><Checkbox label="파일명도 암호화" description="라벨 클릭이나 Space 키로 전환합니다."/></div></section>
 <Notice title="어디에서 시작하나요?">Components에서 상태와 Controls를 바꿔보고, Patterns에서 실제 설정 흐름을 시험하세요. Reference 문서와 AI 전달 자료를 새 대화에 첨부하면 같은 기준을 이어갈 수 있습니다.</Notice>
 </main>;
}
const meta={title:'Start here/Overview',component:Overview,parameters:{layout:'fullscreen'},tags:['!autodocs']} satisfies Meta<typeof Overview>;
export default meta;
export const Welcome:StoryObj<typeof meta>={};
