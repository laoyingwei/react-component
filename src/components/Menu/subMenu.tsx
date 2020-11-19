import React,{useContext,useState,useEffect, useRef} from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
import Icon from '../Icon/icon'
import { CSSTransition } from 'react-transition-group'
import BScroll from 'better-scroll'
import Transition from '../Transition/transition'


export interface SubMenuProps {
    index?:string,
    title:string,
    className?: string,
    disabled?:boolean,
}

const SubMenu:React.FC<SubMenuProps> = ({ index,title,className,children,disabled }) => {
    const context = useContext(MenuContext)
    const defaultOpenSubMenus =  (index && context.model === 'vertical' && !disabled && context.defaultOpenSubMenus?.includes(index)) as boolean
    const [ menuOpen,setMenuOpen ] = useState(defaultOpenSubMenus)

   
    console.log(menuOpen)
    const classes = classNames('menu-item submenu-item',`sub-icon-${context.model}-active`, className, {
        'menu-item-disabled': disabled,
        'menu-item-active': context.index === index,
        

    })
    const handleClick = (e:React.MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }
    let timer:any = null
    const handleMouse = (e:React.MouseEvent,toggle:boolean) => {
        e.preventDefault()
        clearTimeout(timer)
        timer = setTimeout(()=> {
            setMenuOpen(toggle)
        },300)
    }
    const clickEvents =  context.model === 'vertical'? {
        onClick: handleClick
    }: {}
    const hoverEvents = context.model !== 'vertical'? {
        onMouseEnter: (e:React.MouseEvent)=> {
            handleMouse(e,true)
        },
        onMouseLeave: (e:React.MouseEvent)=> {
            handleMouse(e,false)
        }
    }:{}
    let wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        /// as 断言
       if (menuOpen) {
       let wrapper = new BScroll(wrapperRef.current as HTMLDivElement, {
            scrollY: true,
            click: true,
            ///滚轮滑动
            bounce:false,
            mouseWheel:true
        })
        console.log('执行了')
        return () => {
            wrapper.destroy()
        }
       
       }
       
    }, [menuOpen]);
    const renderChildren = () => {
        // console.log(context.index)
        // console.log(index)
        const subMenuClasses = classNames('submenu', {
            'menu-opened': menuOpen
        })
      
        const childComponent = React.Children.map(children, (child,i)=> {
            // let i = (Math.random() * 10)
            const childElemet = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElemet.type
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElemet, {
                    index:`${index}-${i}`,
                })
            }else {
                console.error('Warning: SubMenu has a chid which is not a MenuItem component')
            }
        })
       
        return (
            <Transition
            in={menuOpen}
            timeout={300}
            animation="zoom-in-top"
            unmountOnExit
            appear
            
            >
                <div className="wrapper" ref={wrapperRef}>
                    <ul className={subMenuClasses}>
                    
                    {
                        childComponent
                    }
                    </ul>
                </div>
               
         </Transition>
        )
    }
    
    const iconPic = context.model === 'vertical' ? 'angle-right' : 'angle-down'
    
    const iconActiveclasses =  classNames({
        [`i-icon-${context.model}`]: menuOpen
    })
    // console.log(iconPic)
    return (
        <li className={classes} {...hoverEvents} data-testid="test-subMenu">

            <div className='sub-menu-title' {...clickEvents}>
                {
                    title
                }
                {/* style={{transform:`rotate(${rotate})`}} */}
                <Icon icon={iconPic} className={iconActiveclasses} />
            </div>
            {
              renderChildren()
            }

        </li>
    )

}
SubMenu.displayName = 'SubMenu'
export default SubMenu

