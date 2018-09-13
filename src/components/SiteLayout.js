import React from 'react'
import Helmet from 'react-helmet'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import _ from 'lodash'

import gamepad from '../../static/img/favicon-b.png'
import '../bulma.scss'

const SiteLayout = props => {
    const { location, children } = props

    return [
        <Helmet><link rel="shortcut icon" type="image/svg" href={gamepad} /></Helmet>,
        <Navbar />,
        <div>{children}</div>
    ]
}

export default SiteLayout
