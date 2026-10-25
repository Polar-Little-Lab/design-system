import {forwardRef,type ButtonHTMLAttributes} from 'react';
import {LoaderCircle} from 'lucide-react';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
 variant?:'primary'|'secondary'|'ghost'|'danger'; loading?:boolean;
}
export const Button=forwardRef<HTMLButtonElement,ButtonProps>(function Button({variant='secondary',loading=false,disabled,children,className='',type='button',...props},ref){
 return <button {...props} ref={ref} type={type} disabled={disabled||loading} aria-busy={loading||undefined} className={`polar-button polar-button--${variant} ${className}`}>{loading&&<LoaderCircle className="polar-spin" size={16} aria-hidden/>}{children}</button>;
});
