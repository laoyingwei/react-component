import React, {useContext,useEffect} from 'react'
import classNames from 'classnames'
import { TabContext } from './tab'


type model = 'default' | 'card'



export interface TabItemProps {
    model?:model,
    index?:number,
    label:string,
    children?:any,
    disabled?:boolean
}

const TabItem:React.FC<TabItemProps> = (props) => {
    const context = useContext(TabContext)
    const { children,index,label,disabled } = props
    useEffect(()=> {
        if (index === context.index) {
           if (context.setContent) {
                context.setContent(children)
           }
        }
    },[])
    const classes  = classNames('tab-item', `tab-item-${context.model}`,{
       [`tab-item-${context.model}-active`]: context.index === index,
       'disabled': disabled
    })
    const onSelect = () => {
        if (context.onSelect && typeof index === 'number') {
            if (children) {
                context.onSelect(index,children)
            }else {
                context.onSelect(index)
            }
           
        }
    }

    return (
        <li className={classes} onClick={onSelect}>
            {
                label
            }
        </li>
    )
}

export default TabItem

