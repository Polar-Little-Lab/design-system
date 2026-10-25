import type {Meta,StoryObj} from '@storybook/react-vite';
import {Checkbox} from '../components/Checkbox';
const meta={title:'Components/Checkbox',component:Checkbox,args:{label:'파일명도 암호화',description:'목록을 보는 데도 암호가 필요합니다.',defaultChecked:true},parameters:{docs:{description:{component:'독립적인 켜기/끄기에 사용합니다. Space 키와 라벨 클릭으로 전환할 수 있습니다.'}}}} satisfies Meta<typeof Checkbox>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Playground:Story={};
export const Unchecked:Story={args:{defaultChecked:false}};
export const Disabled:Story={args:{disabled:true}};
