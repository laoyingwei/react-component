import React from 'react'
import { fireEvent, render} from '@testing-library/react'
import Button, {ButtonProps,ButtonType,ButtonSize} from './button'


const defaultProps = {
    onClick:jest.fn()
}

const testProps:ButtonProps  = {
    size: ButtonSize.Large,
    btnType:ButtonType.Danger,
    className: 'tianjia',
}

const disabledProps:ButtonProps = {
    disabled: true,
    onClick:jest.fn()
}

describe('test button', () => {
    it('default button', () => {
        const wrapper = render(<Button {...defaultProps}>Nice</Button>)
        const element = wrapper.getByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
        expect(element).toHaveClass('btn btn-default')
        fireEvent.click(element)
        expect(defaultProps.onClick).toHaveBeenCalled()
    })

    it('Props Button', () => {
        const wrapper = render(<Button {...testProps}>Nice</Button>)
        const element = wrapper.getByText('Nice')
        expect(element).toBeInTheDocument()
        expect(element).toHaveClass('btn-danger btn-lg tianjia')
    })
    it('Button link', ()=> {
        const wrapper = render(<Button btnType={ButtonType.Link} href="http://www.baidu.com">Link</Button>)
        const element = wrapper.getByText('Link')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('A')
        expect(element).toHaveClass('btn btn-link')
    })
    it('disabled button', () => {
        const wrapper = render(<Button {...disabledProps}>Nice</Button>)
        const element = wrapper.getByText('Nice') as HTMLButtonElement
        expect(element).toBeInTheDocument()
        expect(element.disabled).toBeTruthy()
        fireEvent.click(element)
        expect(defaultProps.onClick).not.toHaveBeenCalled()
    })
})