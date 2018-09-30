import React from 'react'
import Link from 'gatsby-link'
import gamepad from '../../static/svg/gamepad-tomato.svg'

import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import Container from 'react-bootstrap/lib/Container'

const NavbarWrapper = props => {
    return (
        <Navbar bg="light" variant="light" expand="md" style={{ borderBottom: '2px solid #ff8d79' }}>
            <Container>
                <Navbar.Brand>
                    <Link to='/' style={{ height: '30px' }}>
                        <img 
                            src={gamepad}
                            alt="Gamepad News"
                            style={{ width: '35px', height: '35px', margin: 0 }}
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" style={{ textTransform: 'uppercase',  letterSpacing: '1px', fontWeight: 'bold', fontSize: '0.75rem' }}>
                        <Nav.Link key="1"><Link to='/playstation'>Playstation</Link></Nav.Link>
                        <Nav.Link key="2"><Link to='/xbox'>Xbox</Link></Nav.Link>
                        <Nav.Link key="3"><Link to='/switch'>Switch</Link></Nav.Link>
                        <Nav.Link key="4"><Link to='/pc'>PC</Link></Nav.Link>
                        <Nav.Link key="5"><Link to='/mobile'>Mobile</Link></Nav.Link>
                        <Nav.Link key="6"><Link to='/retro'>Retro</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarWrapper