import React, {ChangeEvent, FC,InputHTMLAttributes,ReactElement, useState} from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import classNames from 'classnames'

export type sizeType = 'lg' | 'sm'

export type inputChangeType = (e:ChangeEvent<HTMLInputElement>) => void;

////Omit 覆盖原生的属性 防止报错
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>,'size'>{
    disabled?:boolean,
    size?: sizeType,
    icon?:IconProp,
    prepand?: string | ReactElement,
    append?: string | ReactElement,
    onChange?:inputChangeType;
}   


export const Input:FC<InputProps> = (props) => {
    const { disabled,size,icon,prepand,append,className,onChange,...restProps } = props
    const [ inputState,setInputState ] = useState('')

    const classes = classNames('c-input',className, {
        'disabled': disabled,
        [`c-input-${size}`]: size,
        
    })

    return (   
        <>
            <input type="text" disabled={disabled} className={classes} value={inputState} 
                onChange={(e)=>
                {  
                setInputState(e.target.value);
                onChange && onChange(e) } 
                } 
                {...restProps}
                />
        </>
    )
}

Input.defaultProps = {
    placeholder: '请输入内容'
}

export default Input



