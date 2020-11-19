import React from 'react'
import { FontAwesomeIcon,FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

import '@fortawesome/fontawesome-svg-core/styles.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
 
///加载全部图标
library.add(fas)


export type themeProps =  'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark'

export interface IconProps extends FontAwesomeIconProps {
    theme?:themeProps
}



const Icon:React.FC<IconProps> = (props) => {
    const { className, theme,...resetProps } = props
    const classes = classNames('i-icon',className, {
        [`icon-theme-${theme}`]:theme
    })
    return (
       <FontAwesomeIcon className={classes} {...resetProps} />
    )
}

export default Icon