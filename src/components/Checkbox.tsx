import {useId,type InputHTMLAttributes} from 'react';
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>,'type'>{label:string;description?:string}
export function Checkbox({label,description,id:provided,...props}:CheckboxProps){
 const generated=useId(),id=provided||generated;
 return <div className="polar-check"><input {...props} id={id} type="checkbox" aria-describedby={description?id+'-description':undefined}/><div><label htmlFor={id}>{label}</label>{description&&<p id={id+'-description'}>{description}</p>}</div></div>;
}
