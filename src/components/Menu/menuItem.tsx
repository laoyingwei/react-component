import React,{useContext} from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
    index?:string,
    disabled?:boolean,
    className?:string,
    style?:React.CSSProperties
}

const MenuItem:React.FC<MenuItemProps> = (props) => {
    const { index,disabled,className,style,children } = props
    const context = useContext(MenuContext)
    const classes = classNames('menu-item', className,{
        'menu-item-disabled': disabled,
        'menu-item-active': context.index === index
    })
    const onSelect = () => {
        // console.log(index)
        if (context.onSelect && !disabled && typeof index === 'string') {
            context.onSelect(index)
            // console.log(index)
        }
    }
    return (
        <li className={classes} style={style} onClick={onSelect}>
            {
                children
            }
        </li>
    )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem
