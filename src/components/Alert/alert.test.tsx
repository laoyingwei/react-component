import React from 'react'
import { render } from '@testing-library/react'
import Alert,{AlertProps,BgColorTypes,LeftIconType} from './alert'


const testProps:AlertProps = {
    BgColorTypes: BgColorTypes.danger,
    Info: '测试alert',
    LeftIcon: LeftIconType.success
}

describe('test alert', ()=> {
    it('default alert', ()=> {
        const wrapper = render(<Alert {...testProps}>ALERT</Alert>)
        const element = wrapper.getByText('ALERT').parentElement?.parentElement as HTMLElement
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('DIV')
        expect(element).toHaveClass('alert alert-danger')
        const iconElement = document.getElementsByClassName('icon-success')
        expect(iconElement[0]).toBeInTheDocument()
    })
})

