import React, { createContext,useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type model = 'horizontal' | 'vertical'

type selectCallBack = (selectIndex:string) => void;

export interface MenuProps {
    defaultIndex?:string,
    className?:string,
    style?:React.CSSProperties,
    onSelect?: selectCallBack,
    model?:model,
    defaultOpenSubMenus?:Array<string>
}

interface IMenuContext {
    index:string,
    onSelect?:selectCallBack,
    model?:model,
    defaultOpenSubMenus?:Array<string>
}

///定义组件下全部能使用的变量和函数
export const MenuContext = createContext<IMenuContext>({index:'0'})
const Menu:React.FC<MenuProps> = (props) => {
    const {defaultIndex,className,children,style,onSelect,model,defaultOpenSubMenus} = props
    const [currentActive,setActive] = useState(defaultIndex)
    const classes = classNames('menu',className, `menu-${model}`)
    const handleClick = (index:string) => {
        setActive(index)
        if (onSelect) {
            onSelect(index)
        }
    }
    ///子组件onSelect函数
    const passedContext:IMenuContext = {
        index: currentActive ? currentActive :'0',
        onSelect: handleClick,
        model,
        defaultOpenSubMenus
    }
    const renderChildren = () => {
       return React.Children.map(children,(child,index)=> {
            const ChildElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName }  = ChildElement.type
            if (displayName === 'MenuItem' ||displayName === 'SubMenu' ) {
                return React.cloneElement(ChildElement,{
                    index: index.toString()
                })
            }else {
                console.error('Warning: Menu has a chid which is not a MenuItem component')
            }
        })
    }
    return (
        <ul className={classes} style={style} data-testid="test-menu">
           <MenuContext.Provider value={passedContext}>
            {
                renderChildren()
            }
           </MenuContext.Provider>
        </ul>
    )
}


Menu.defaultProps = {
    defaultIndex: '-1',
    model: 'horizontal',
    defaultOpenSubMenus: []
}

export default Menu