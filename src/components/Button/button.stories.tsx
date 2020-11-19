import React from 'react'
import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import Button, {ButtonSize,ButtonType} from './button'
import { withInfo } from '@storybook/addon-info'

const styles:React.CSSProperties =  {
    textAlign: 'center'
}

const CreateDecorator = (storFn:any) => <div style={styles}>{storFn()}</div>

const defaultButton = () => (
    <Button onClick={action('点击按钮')}>default</Button>
)

const buttonSize = () => (
    <>
    <Button onClick={action('点击按钮')} size={ButtonSize.Small}>小的</Button>
    <Button onClick={action('点击按钮')}>默认的</Button>
    <Button onClick={action('点击按钮')} size={ButtonSize.Large}>大的</Button>
    </>
)

const buttonType = () => (
    <>
    <Button onClick={action('点击按钮')} btnType={ButtonType.Default}>默认按钮</Button>
    <Button onClick={action('点击按钮')} btnType={ButtonType.Primary}>主要按钮</Button>
    <Button onClick={action('点击按钮')} btnType={ButtonType.Danger}>危险按钮</Button>
    <Button onClick={action('点击按钮')} btnType={ButtonType.Link} href="http://www.baidu.com">链接按钮</Button>
</>
)

storiesOf('Button', module).addDecorator(withInfo as any).addParameters({
    info: {
        text: 'this is a very nice component',
        inline: true
    }
})
.add('尺寸按钮',buttonSize)
.add('类型按钮',buttonType)