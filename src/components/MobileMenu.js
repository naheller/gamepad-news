import React, { PureComponent } from 'react'
import Link from 'gatsby-link'
import '../../static/styles/fontello/css/fontello.css'

class MobileMenu extends PureComponent {
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
            <div className="hamburger" onClick={this.toggleMenu} key="hamburger-icon-wrapper">
                <span className="icon" key="hamburger-icon">
                    { this.state.open
                        ? <i className="icon-cancel-1 white" key="icon-cancel" />
                        : <i className="icon-menu" key="icon-hamburger" />
                    }
                </span>
            </div>,
            this.state.open && (
                <div className="mobile-menu" key="mobile-menu">
                    <div className="links" key="shortcut-links">
                        <Link to='/playstation' key="shortcut-playstation" title="shortcut-playstation">
                            <h3>Playstation</h3>
                        </Link>
                        <Link to='/xbox' key="shortcut-xbox" title="shortcut-xbox">
                            <h3>Xbox</h3>
                        </Link>
                        <Link to='/switch' key="shortcut-switch" title="shortcut-switch">
                            <h3>Switch</h3>
                        </Link>
                        <Link to='/pc' key="shortcut-pc" title="shortcut-pc">
                            <h3>PC</h3>
                        </Link>
                        <Link to='/mobile' key="shortcut-mobile" title="shortcut-mobile">
                            <h3>Mobile</h3>
                        </Link>
                        <Link to='/retro' key="shortcut-retro" title="shortcut-retro">
                            <h3>Retro</h3>
                        </Link>
                    </div>
                </div>
            )
        ]
    }
}

export default MobileMenu