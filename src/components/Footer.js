import React from 'react'
import Link from 'gatsby-link'
import gamepad from '../../static/svg/gamepad-tomato.svg'

import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import Container from 'react-bootstrap/lib/Container'

const Footer = props => {
    return (
        <Navbar bg="light" variant="light" expand="md" style={{ borderTop: '2px solid #ff8d79', background: 'linear-gradient(to right, whitesmoke, #fafafa)' }}>
            <Container>
                <Navbar.Brand>
                    <Link to='/' style={{ height: '30px' }}>
                        <img 
                            src={gamepad}
                            alt="Gamepad News"
                            style={{ width: '1.85rem', height: '2rem', margin: '0 0 0 0.5rem' }}
                        />
                    </Link>
                </Navbar.Brand>
                <Nav className="mr-auto">
                    <p style={{ fontSize: '0.75rem', color: '#999', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>© 2018 Gamepad News</p>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Footer