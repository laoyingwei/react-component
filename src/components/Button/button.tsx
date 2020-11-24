import React ,{FC,ButtonHTMLAttributes,AnchorHTMLAttributes,ReactNode}from 'react'
import classNames from 'classnames'
// import './_styles.scss'

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm'
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link'
}
export interface BaseButtonProps {
    className?: string,
    disabled?: boolean,
    size?: ButtonSize,
    btnType?:ButtonType,
    children:ReactNode,
    href?:string,
}

////ButtonHTMLAttributes<> 泛型的接口 
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>

type AnthorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
///Partial把属性都变成可选的
export type ButtonProps = Partial<NativeButtonProps & AnthorButtonProps>

export const Button:FC<ButtonProps> = (props) => {
    const  { 
        className,
        disabled,
        size,
        btnType,
        children,
        href,
        ...ButtonProps
    } = props
    const classes = classNames('btn', {
        [`btn-${btnType}`]:btnType,
        [`btn-${size}`]:size,
        'disabled': (btnType === ButtonType.Link) && disabled
    },className)
    if (btnType === ButtonType.Link && href) {
    return <a  href={href} className={classes} { ...ButtonProps}>{children}</a>
    }else {
        return <button
        { ...ButtonProps}
        className={classes}
        disabled={disabled}
        >{children}</button>
    }
}

 Button.defaultProps = {
    disabled:false,
    btnType:ButtonType.Default
}

export default Button;