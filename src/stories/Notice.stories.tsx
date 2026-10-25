import type {Meta,StoryObj} from '@storybook/react-vite';
import {Notice} from '../components/Notice';
const meta={title:'Components/Notice',component:Notice,args:{tone:'info',title:'설정 내용을 확인하세요.',children:'중요한 안내를 숨기지 않고 짧게 전달합니다.'},argTypes:{tone:{control:'select',options:['info','success','warning']}}} satisfies Meta<typeof Notice>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Playground:Story={};
export const Success:Story={args:{tone:'success',title:'설정 검증을 통과했습니다.'}};
export const Warning:Story={args:{tone:'warning',title:'파일명은 숨겨지지 않습니다.',children:'ZIP은 내용을 암호화합니다. 파일명까지 숨기려면 7z를 선택하세요.'}};
