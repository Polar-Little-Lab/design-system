import {CheckCircle2,Info,TriangleAlert} from 'lucide-react';
import type {ReactNode} from 'react';
export function Notice({tone='info',title,children}:{tone?:'info'|'success'|'warning';title:string;children?:ReactNode}){
 const Icon=tone==='success'?CheckCircle2:tone==='warning'?TriangleAlert:Info;
 return <div className={`polar-notice polar-notice--${tone}`} role="status"><Icon size={19} aria-hidden/><div><strong>{title}</strong>{children&&<p>{children}</p>}</div></div>;
}
