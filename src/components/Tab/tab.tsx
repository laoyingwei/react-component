import React, { createContext,useState } from 'react'
import classNames from 'classnames'
import { TabItemProps } from './tabItem'

type model = 'default' | 'card'
type onSelectCallBack = (number: number) =>void;
type onSelectNumberAndContent =(number: number,children?:React.ReactHTMLElement<HTMLElement>) =>void;

interface tabContext {
    index?:number,
    onSelect?: onSelectNumberAndContent,
    model?:model,
    setContent?: (children?:React.ReactHTMLElement<HTMLElement>) =>void;
}

interface TabProps {
    defaultIndex:number,
    model?:model,
    onSelect?:onSelectCallBack
}
export const TabContext = createContext<tabContext>({index: 0})
const Tab:React.FC<TabProps> = (props) => {
    const { children,model,onSelect,defaultIndex } = props
    const [ index,setIndex ] = useState(defaultIndex)
    const [content,setContent] = useState<React.ReactHTMLElement<HTMLElement>>()
    const classes = classNames('tab', {
        'tab-border': model === 'card'
    })
    const handleClick = (number:number,children?:React.ReactHTMLElement<HTMLElement>) => {
        setIndex(number)
        if (children) {
            setContent(children)
        }
        if (onSelect) {
            onSelect(number)
        }
    }
    const passContent:tabContext = {
        index,
        model,
        onSelect:handleClick,
        setContent: setContent
    }
    const renderChildren = () => {
        return React.Children.map(children, (child,index)=> {
            const ChildElemet = child as React.FunctionComponentElement<TabItemProps>
            return React.cloneElement(ChildElemet, {
                index
            })
        })
    }
    return (
       <div className="tab-content">
             <TabContext.Provider value={passContent}>
            <div className="flexBox">
                <ul className={classes}>
                    {/* <li className="tab-item tab-item-card tab-item-card-active">标题一</li>
                    <li className="tab-item tab-item-card ">标题二</li>
                    <li className="tab-item tab-item-card ">标题三</li> */}
                
                    {
                        renderChildren()
                    }
                
                </ul>
                <div className="flexContent"></div>
            </div>
            <div className="content">
            {
                content
            }
            </div>
            </TabContext.Provider>
       </div>
    )
}

Tab.defaultProps = {
    model: 'default',
    defaultIndex: 0
}

export default Tab