import React, { useState} from 'react'
import classNames from 'classnames'
import Transition from '../Transition/transition'
import IconComponent from '../Icon/icon'


export enum BgColorTypes {
    default = 'default',
    success = 'success',
    danger = 'danger',
    warning = 'warning'
}

export enum LeftIconType{
    default = 'tishi',
    success ='success',
    danger = 'cuowu',
    warning = 'warn'
}

export type closeCallBack = () => void

export interface AlertProps {
    BgColorTypes?:BgColorTypes,
    Title?:string,
    Info?:string,
    Icon?:string,
    IsShowIcon?:boolean,
    LeftIcon?:string,
    children?:React.ReactNode,
    IsShow?:boolean,
    closeCallBack?: closeCallBack,
    timeout:number
}

// type HtmlAttributtes = AlertProps & React.HTMLAttributes<HTMLElement>

// export type AlertAllProps = Partial< HtmlAttributtes & AlertProps>

 const Alert = (props:AlertProps) => {
    // const [IsShow,setIsShow] = useState(true)
    // useEffect(() => {
    //     console.log(IsShow)
    //     setIsShow(true)
    // }, [IsShow]);
   
    const {
        BgColorTypes: bgColor,
        Title,
        Icon,
        IsShowIcon,
        children,
        IsShow,
        closeCallBack,
        timeout
    } = props
    ///断言 bgColor as BgColorTypes 指定类型
    let {LeftIcon} = props
    if (!LeftIcon) {
        LeftIcon = LeftIconType[bgColor as BgColorTypes]
    }
    const classes = classNames('alert',`alert-${bgColor}`)
    const closeIcon = classNames('iconfont',`icon-${Icon}`)
    const leftIcon = classNames('iconfont',`icon-${LeftIcon}`)
    return (
       
        <div className="alertContent">
        <Transition in={IsShow} timeout={timeout} appear unmountOnExit
            animation='pop-in-center'
            wrapper
            >
             <div className={classes}>
             <div className="alert-left-icon">
                <i className={leftIcon}></i>
             </div>
             <div className="alert-right-content">
                <div className="alert-top">
                    <div className="alert-title">{Title}</div>
                    {
                    IsShowIcon ?<div className="alert-close-icon"
                        onClick={()=> {closeCallBack && closeCallBack()}}
                        >
                        {/* <i className={closeIcon}></i> */}
                        <IconComponent icon='window-close' />
                    </div> : <></>
                    }
                </div>
                
                <div className="alert-info">
                {
                    children
                }    
                </div> 

             </div>

             </div>
             </Transition>
        </div>
    )
}
export default Alert

Alert.defaultProps = {
    BgColorTypes: BgColorTypes.default,
    Title: '标题',
    IsShow: true,
    Icon: 'icon_wrong',
    IsShowIcon: true,
    LeftIcon: '',
    timeout: 300
}