import type {Meta,StoryObj} from '@storybook/react-vite';
import {ArchiveForm} from '../components/ArchiveForm';
import {expect,userEvent,within} from 'storybook/test';
const meta={title:'Patterns/Archive settings',component:ArchiveForm,parameters:{layout:'padded',docs:{description:{component:'실제 압축을 수행하지 않는 안전한 UI 실습입니다. 형식·암호화 변경, 비밀번호 불일치, 표시 전환, 성공 상태를 시험하세요.'}}}} satisfies Meta<typeof ArchiveForm>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Playground:Story={};
export const ValidationContract:Story={play:async({canvasElement})=>{
 const c=within(canvasElement),body=within(canvasElement.ownerDocument.body);
 await userEvent.click(c.getByRole('combobox',{name:'암호화'}));await userEvent.click(body.getByRole('option',{name:/AES-256/}));
 await userEvent.type(c.getByLabelText('암호',{exact:true}),'fixture-only');await userEvent.type(c.getByLabelText('암호 확인'),'different');
 await userEvent.click(c.getByRole('button',{name:'설정 테스트'}));await expect(c.getByText('암호를 동일하게 입력해 주세요.')).toBeVisible();
 await userEvent.clear(c.getByLabelText('암호 확인'));await userEvent.type(c.getByLabelText('암호 확인'),'fixture-only');
 await userEvent.click(c.getByRole('button',{name:'설정 테스트'}));await expect(c.getByRole('status')).toHaveTextContent('설정 검증을 통과했습니다.');
}};
