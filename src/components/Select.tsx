import {useId} from 'react';
import * as R from '@radix-ui/react-select';
import {Check,ChevronDown,ChevronUp} from 'lucide-react';
export type SelectOption={value:string;label:string;description?:string;disabled?:boolean};
export interface SelectProps{
 label:string;options:SelectOption[];value?:string;defaultValue?:string;onValueChange?:(value:string)=>void;
 placeholder?:string;disabled?:boolean;error?:string;helper?:string;required?:boolean;name?:string;
}
export function Select({label,options,value,defaultValue,onValueChange,placeholder='선택하세요',disabled,error,helper,required,name}:SelectProps){
 const id=useId(),message=error||helper;
 return <div className="polar-field">
  <label className="polar-label" htmlFor={id}>{label}{required&&<span aria-hidden> *</span>}</label>
  <R.Root value={value} defaultValue={defaultValue} onValueChange={onValueChange} disabled={disabled} required={required} name={name}>
   <R.Trigger id={id} className="polar-select" aria-invalid={!!error} aria-describedby={message?id+'-message':undefined}><R.Value placeholder={placeholder}/><R.Icon asChild><ChevronDown size={17}/></R.Icon></R.Trigger>
   <R.Portal><R.Content className="polar-options" position="popper" sideOffset={6} collisionPadding={12}>
    <R.ScrollUpButton className="polar-scroll"><ChevronUp size={16}/></R.ScrollUpButton>
    <R.Viewport className="polar-options-viewport">
     {options.map((option,index)=><R.Item className="polar-option" key={option.value} value={option.value} disabled={option.disabled} textValue={option.label} aria-describedby={option.description?id+"-option-"+index:undefined}>
      <div className="polar-option-copy"><R.ItemText>{option.label}</R.ItemText>{option.description&&<span id={id+"-option-"+index} className="polar-option-description">{option.description}</span>}</div>
      <R.ItemIndicator><Check size={18} aria-hidden/></R.ItemIndicator>
     </R.Item>)}
    </R.Viewport><R.ScrollDownButton className="polar-scroll"><ChevronDown size={16}/></R.ScrollDownButton>
   </R.Content></R.Portal>
  </R.Root>
  {message&&<p className={error?'polar-message polar-error':'polar-message'} id={id+'-message'}>{message}</p>}
 </div>;
}
