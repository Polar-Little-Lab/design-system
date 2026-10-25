import type {Meta,StoryObj} from '@storybook/react-vite';
import {TextField} from '../components/TextField';
const meta={title:'Components/TextField',component:TextField,args:{label:'파일 이름',placeholder:'예: 공유할 자료',helper:'확장자는 선택한 형식으로 붙습니다.'},parameters:{docs:{description:{component:'placeholder는 라벨을 대체하지 않습니다. 오류는 해당 필드 아래에 표시하고 aria-describedby로 연결합니다.'}}},decorators:[Story=><div style={{maxWidth:400,padding:20}}><Story/></div>]} satisfies Meta<typeof TextField>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Playground:Story={};
export const Error:Story={args:{error:'같은 이름이 있습니다. 다른 이름을 입력하세요.',defaultValue:'공유할 자료'}};
export const Password:Story={args:{label:'암호',type:'password',helper:'실제 암호 대신 테스트 값을 입력하세요.',placeholder:'',autoComplete:'new-password'}};
export const Disabled:Story={args:{disabled:true,defaultValue:'처리 중'}};
