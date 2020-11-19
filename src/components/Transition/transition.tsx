import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

///type
export type AnimationName = 'zoom-in-top' | 
'zoom-in-bottom' | 'zoom-in-left' | 'zoom-in-right'|
'pop-in-top' | 'pop-in-left'| 'pop-in-right' | 'pop-in-bottom' | 'pop-in-center'


///type 继承 & 

export type TransitionProps = CSSTransitionProps & {
    animation?: AnimationName,
    wrapper?:boolean
}

const Transition:React.FC<TransitionProps>  = (props)=>{
    const { animation,classNames,children,wrapper,...restProps} = props
    return (
     <CSSTransition classNames={classNames?classNames: animation} {...restProps}>
         {
           wrapper ? <div>{ children }</div> : children
         }
     </CSSTransition>
    )
}
Transition.defaultProps = {
    animation: 'zoom-in-top'
}

export default Transition