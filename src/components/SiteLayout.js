import React from 'react'
import Helmet from 'react-helmet'
import { Layout } from 'antd'

import Navbar from './Navbar'
import Sidebar from './Sidebar'
import FooterContent from './Footer'
import gamepad from '../../static/img/favicon-b.png'

const SiteLayout = props => {
    const { location, children } = props
    const { Header, Footer, Sider, Content } = Layout;

    const addHelmet = () => (
        <Helmet>
            <link rel="shortcut icon" type="image/svg" href={gamepad} />
            <link 
                rel="stylesheet" 
                href="https://use.fontawesome.com/releases/v5.3.1/css/brands.css" 
                integrity="sha384-rf1bqOAj3+pw6NqYrtaE1/4Se2NBwkIfeYbsFdtiR6TQz0acWiwJbv1IM/Nt/ite" 
                crossorigin="anonymous" 
            />
            <link 
                rel="stylesheet" 
                href="https://use.fontawesome.com/releases/v5.3.1/css/solid.css" 
                integrity="sha384-VGP9aw4WtGH/uPAOseYxZ+Vz/vaTb1ehm1bwx92Fm8dTrE+3boLfF1SpAtB1z7HW" 
                crossorigin="anonymous"
            />
            <link 
                rel="stylesheet" 
                href="https://use.fontawesome.com/releases/v5.3.1/css/fontawesome.css" 
                integrity="sha384-1rquJLNOM3ijoueaaeS5m+McXPJCGdr5HcA03/VHXxcp2kX2sUrQDmFc3jR5i/C7" 
                crossorigin="anonymous" 
            />
            <link 
                rel="stylesheet" 
                href="https://use.fontawesome.com/releases/v5.3.1/css/regular.css" 
                integrity="sha384-ZlNfXjxAqKFWCwMwQFGhmMh3i89dWDnaFU2/VZg9CvsMGA7hXHQsPIqS+JIAmgEq" 
                crossorigin="anonymous"
            />
        </Helmet>
    )

    return (
        <Layout>
            {addHelmet()}
            <Header><Navbar /></Header>
            <Layout style={{ padding: '0 50px' }}>
                <Sider width={350} style={{ backgroundColor: 'white' }}><Sidebar location={location} /></Sider>
                <Content style={{ margin: '2.5rem 3.5rem' }}>{children}</Content>
            </Layout>
            <Footer style={{ backgroundColor: '#001529' }}><FooterContent /></Footer>
        </Layout>
    )
}

export default SiteLayout
