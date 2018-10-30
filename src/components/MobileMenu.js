import React, { Component } from 'react'
import Link from 'gatsby-link'
import '../../static/styles/fontello/css/fontello.css'

class MobileMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    toggleMenu = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        return [
            <div className="hamburger" onClick={this.toggleMenu}>
                <span className="icon">
                    {   this.state.open
                        ? <i className="icon-cancel-1 white" />
                        : <i className="icon-menu" />
                    }
                </span>
            </div>,
            this.state.open && (
                <div className="mobile-menu">
                    <div className="links">
                        <Link to='/playstation'>
                            <h3>Playstation</h3>
                        </Link>
                        <Link to='/xbox'>
                            <h3>Xbox</h3>
                        </Link>
                        <Link to='/switch'>
                            <h3>Switch</h3>
                        </Link>
                        <Link to='/pc'>
                            <h3>PC</h3>
                        </Link>
                        <Link to='/mobile'>
                            <h3>Mobile</h3>
                        </Link>
                        <Link to='/retro'>
                            <h3>Retro</h3>
                        </Link>
                    </div>
                </div>
            )
        ]
    }
}

export default MobileMenu