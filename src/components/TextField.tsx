import {forwardRef,useId,type InputHTMLAttributes} from 'react';
export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement>{label:string;helper?:string;error?:string}
export const TextField=forwardRef<HTMLInputElement,TextFieldProps>(function TextField({label,helper,error,id:provided,required,...props},ref){
 const generated=useId(),id=provided||generated,message=error||helper;
 return <div className="polar-field"><label className="polar-label" htmlFor={id}>{label}{required&&<span aria-hidden> *</span>}</label><input {...props} ref={ref} id={id} required={required} className="polar-input" aria-invalid={!!error} aria-describedby={message?id+'-message':undefined}/>{message&&<p id={id+'-message'} className={error?'polar-message polar-error':'polar-message'}>{message}</p>}</div>;
});
