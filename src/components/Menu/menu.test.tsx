import React from 'react'
import { cleanup, fireEvent, render,RenderResult, wait, waitFor } from '@testing-library/react'
import Menu, {MenuProps} from './menu'
import MenuItem,{MenuItemProps} from './menuItem'
import SubMenu from './subMenu'

const testProps:MenuProps ={
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test',
    // model:'vertical'
}


const testVerProps:MenuProps = {
    defaultIndex:'0',
    model:'horizontal'
}

const testDefaultSubMenuOpenProps:MenuProps = {
    defaultOpenSubMenus:['4']
}

let wrapper:RenderResult,menuElement:HTMLElement,activeElement:HTMLElement,disabledElement:HTMLElement

 const generateMenu = (props:MenuProps) => (
    <Menu {...props}>
        <MenuItem>active</MenuItem>
        <MenuItem disabled>disabled</MenuItem>
        <MenuItem >thirdItem</MenuItem>
        <SubMenu title="submenu">
            <MenuItem>drop1</MenuItem>
            <MenuItem disabled>MenuItem2</MenuItem>
            <MenuItem >MenuItem3</MenuItem>
        </SubMenu>
        <SubMenu title="submenu12">
            <MenuItem>drop112</MenuItem>
            <MenuItem disabled>MenuItem122</MenuItem>
            <MenuItem >MenuItem123</MenuItem>
        </SubMenu>
        {/* <p>abc</p> */}
    </Menu>
 )

 const createStyleFile = () => {
     const cssFile:string = `
        .submenu {
            display:none;
        }
        .submenu.menu-opened {
            display:block
        }
     `
     const style = document.createElement('style')
    //  style.type = 'test/css'
     style.innerHTML = cssFile
     return style
 }

describe('测试menu组件', ()=> {
    beforeEach(()=> {
        wrapper = render(generateMenu(testProps))
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId('test-menu')
        activeElement = wrapper.getByText('active')
        disabledElement = wrapper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem based on default props', () => {
      expect(menuElement).toBeInTheDocument()
      expect(menuElement).toHaveClass('menu test')
      expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
      expect(activeElement).toHaveClass('menu-item menu-item-active')
    //   expect(activeElement).toBeInTheDocument()
    //   expect(disabledElement).toBeInTheDocument()

    })

    it('click items should changes active and call the right callback', ()=>{
        const thirdItem = wrapper.getByText('thirdItem')
        fireEvent.click(thirdItem)
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        expect(thirdItem).toHaveClass('menu-item menu-item-active')
        expect(activeElement).not.toHaveClass('menu-item-active')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('menu-item-active')
        expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
    })

    it('should render vertical mode when mode is set to vertical', ()=> {
        cleanup()
        const wrapper = render(generateMenu(testVerProps))
        const menuElement = wrapper.getByTestId('test-menu')
        expect(menuElement).not.toHaveClass('menu-vertical')
    })

    it('should show dropdown items when hover on SubMenu', async ()=> {
        expect(wrapper.queryByText('drop1')).not.toBeVisible()
        const subMenuElement = wrapper.getByText('submenu')
        fireEvent.mouseEnter(subMenuElement)
        await waitFor(()=> {
            expect(wrapper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(wrapper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(subMenuElement)
        await waitFor(()=> {
            expect(wrapper.queryByText('drop1')).not.toBeVisible()
        })
    })

    it('should show SubMenu Default Open when set defaultSubMenus', () => {
        cleanup()
        const wrapper = render(generateMenu(testDefaultSubMenuOpenProps))
        wrapper.container.append(createStyleFile())
        const subMenuDefaultOpen = wrapper.getByText('submenu12')
        expect(subMenuDefaultOpen).toBeVisible()

    })
})