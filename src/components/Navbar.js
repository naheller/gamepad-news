import React from 'react'
import Link from 'gatsby-link'
import gamepad from '../../static/svg/gamepad.svg'
import { Menu } from 'antd'

const Navbar = props => {
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
        >
            <Menu.Item>
                <Link to='/'>
                    <img 
                        src={gamepad}
                        alt="Gamepad News"
                        style={{ width: '30px' }}
                    />
                </Link>
            </Menu.Item>
            <Menu.Item key="1"><Link to='/playstation'>Playstation</Link></Menu.Item>
            <Menu.Item key="2"><Link to='/xbox'>Xbox</Link></Menu.Item>
            <Menu.Item key="3"><Link to='/switch'>Switch</Link></Menu.Item>
            <Menu.Item key="4"><Link to='/pc'>PC</Link></Menu.Item>
            <Menu.Item key="5"><Link to='/mobile'>Mobile</Link></Menu.Item>
            <Menu.Item key="6"><Link to='/retro'>Retro</Link></Menu.Item>
        </Menu>
    )
}

export default Navbar