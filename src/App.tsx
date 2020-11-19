import React, { useState,useRef, useEffect } from "react";
import Tab from './components/Tab/tab'
import TabItem from './components/Tab/tabItem'
import SubMenu from './components/Menu/subMenu'
import Menu from './components/Menu/menu'
import MenuItem from './components/Menu/menuItem'
import Icon from './components/Icon/icon'
import { CSSTransition } from 'react-transition-group'
import Alert,{AlertProps,BgColorTypes} from './components/Alert/alert'
import Button,{BaseButtonProps,ButtonType} from './components/Button/button'

import BetterScroll from 'better-scroll'
///原则做完css和逻辑 再做动画
export default function App () {
  const onSelect = (number:string) =>{console.log(number)}
  const [ IsShow,setShow ] = useState(false)
  let wrapperRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    /// as 断言
    const wrapper = new BetterScroll(wrapperRef.current as HTMLDivElement, {

    })
    console.log(wrapper)
  }, []);
  const handleChangeIsShow = () => {
    setShow(!IsShow)
  }
  return (
    <div>
      <div ref={wrapperRef}>
        <div>
          abadfas
        </div>
      </div>
       <Menu  defaultIndex='0-1' defaultOpenSubMenus={['1']} onSelect={(number:string)=>{onSelect(number)}}>
          <SubMenu title="标题一">
            <MenuItem>
            我是sub的子集</MenuItem>
            <MenuItem>
            我是sub的子集</MenuItem>
           
            <MenuItem>
            我是sub的子集</MenuItem>
          </SubMenu>
          <SubMenu title="标题一">
            <MenuItem>
            我是sub的子集</MenuItem>
            <MenuItem>
            我是sub的子集</MenuItem>
            <MenuItem>
            我是sub的子集</MenuItem>
            <MenuItem>
            我是sub的子集</MenuItem>
          </SubMenu>
      </Menu>
      <Button onClick={handleChangeIsShow} btnType={ButtonType.Danger}>关闭/打开</Button>
      
       <Alert Title="提示"  
        closeCallBack={handleChangeIsShow}
        IsShow={IsShow}
        timeout={1000}
        >
         请输入字符串
        </Alert>
    </div>
  )
}