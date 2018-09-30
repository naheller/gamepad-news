import React from 'react'
import Link from 'gatsby-link'
import gamepad from '../../static/svg/gamepad-tomato.svg'

import Nav from 'react-bootstrap/lib/Nav'
import Navbar from 'react-bootstrap/lib/Navbar'
import Container from 'react-bootstrap/lib/Container'

const NavbarWrapper = props => {
    return (
        <Navbar variant="light" expand="md" style={{ borderBottom: '2px solid #ff8d79', background: 'linear-gradient(to right, whitesmoke, #fafafa)' }}>
            <Container>
                <Navbar.Brand>
                    <Link to='/'>
                        <img 
                            src={gamepad}
                            alt="Gamepad News"
                            style={{ width: '1.85rem', height: '2rem', margin: '0 0 0 0.5rem' }}
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto" style={{ textTransform: 'uppercase',  letterSpacing: '1.5px', fontSize: '0.75rem' }}>
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