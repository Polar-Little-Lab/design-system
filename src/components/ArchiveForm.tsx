import {useState,type FormEvent} from 'react';
import {Archive,ShieldCheck} from 'lucide-react';
import {Button} from './Button';
import {Select} from './Select';
import {TextField} from './TextField';
import {Checkbox} from './Checkbox';
import {Notice} from './Notice';
export function ArchiveForm(){
 const [format,setFormat]=useState('zip'),[encryption,setEncryption]=useState('none'),[password,setPassword]=useState(''),[confirm,setConfirm]=useState(''),[show,setShow]=useState(false),[names,setNames]=useState(true),[error,setError]=useState(''),[complete,setComplete]=useState(false);
 const encrypted=encryption!=='none';
 function submit(e:FormEvent){e.preventDefault();if(encrypted&&(!password||password!==confirm)){setError('암호를 동일하게 입력해 주세요.');setComplete(false);return;}setError('');setComplete(true);setPassword('');setConfirm('');}
 return <form className="archive-demo" onSubmit={submit} noValidate>
  <header><span className="demo-icon"><Archive size={24}/></span><div><h2>안전하게 묶어 공유하세요.</h2><p>Polarzip의 설정 흐름을 직접 시험하는 예제입니다.</p></div></header>
  <div className="polar-grid three">
   <Select label="형식" value={format} onValueChange={v=>{setFormat(v);if(v==='7z'&&encrypted)setEncryption('256');setComplete(false);}} options={[{value:'zip',label:'ZIP',description:'일반적인 파일 공유'},{value:'7z',label:'7z',description:'높은 압축률 · 파일명 암호화'}]}/>
   <Select label="암호화" value={encryption} onValueChange={v=>{setEncryption(v);setError('');setComplete(false);if(v==='none'){setPassword('');setConfirm('');}}} options={[{value:'none',label:'암호 없음',description:'암호 없이 열 수 있는 파일'},{value:'256',label:'AES-256 · 권장',description:'256비트 AES 암호화'},...(format==='zip'?[{value:'192',label:'AES-192'},{value:'128',label:'AES-128'}]:[])]}/>
   <Select label="압축 수준" defaultValue="standard" options={[{value:'fast',label:'빠른 압축',description:'속도 우선'},{value:'standard',label:'표준 압축',description:'속도와 크기의 균형'},{value:'maximum',label:'최대 압축',description:'파일 크기 우선'}]}/>
  </div>
  {encrypted&&<section className="password-panel"><div className="polar-grid">
   <TextField label="암호" type={show?'text':'password'} autoComplete="new-password" value={password} onChange={e=>{setPassword(e.target.value);setComplete(false);}}/>
   <TextField label="암호 확인" type={show?'text':'password'} autoComplete="new-password" value={confirm} error={error} onChange={e=>{setConfirm(e.target.value);setError('');setComplete(false);}}/>
  </div><div className="polar-inline"><Checkbox label="암호 표시" checked={show} onChange={e=>setShow(e.target.checked)}/>{format==='7z'&&<Checkbox label="파일명도 암호화" checked={names} onChange={e=>setNames(e.target.checked)}/>}</div><p className="polar-message"><ShieldCheck size={14} aria-hidden/> {format==='7z'?'파일명 암호화를 켜면 목록도 숨깁니다.':'ZIP은 내용만 보호합니다. 파일명까지 숨기려면 7z를 선택하세요.'}</p></section>}
  {complete&&<Notice tone="success" title="설정 검증을 통과했습니다.">실제 파일을 생성하거나 입력한 암호를 서버에 보내지 않습니다.</Notice>}
  <footer><small>UI 동작 예제 · 실제 압축은 실행하지 않습니다.</small><Button type="submit" variant="primary">설정 테스트</Button></footer>
 </form>;
}
