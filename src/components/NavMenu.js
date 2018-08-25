import React from 'react'
import { Link } from 'gatsby'
import '../styles.css'

import ps from '../../static/svg/playstation.svg'
import xbox from '../../static/svg/xbox.svg'
import nswitch from '../../static/svg/switch.svg'
import pc from '../../static/svg/pc.svg'
import mobile from '../../static/svg/phone.svg'
import retro from '../../static/svg/invaders.svg'

const NavMenu = () => (
    <div className="nav-menu">
        <div className="nav-menu-tags">
            <Link
                to={`/playstation`}
                key={'ps'}
                className="nav-menu-tag-button"
            >
                <img 
                    src={ps} 
                    className="nav-menu-tag-icon" 
                    alt="Playstation"
                />
                <span className="nav-menu-tag-text">playstation</span>
            </Link>
            <Link
                to={`/xbox`}
                key={'xbox'}
                className="nav-menu-tag-button"
            >
                <img 
                    src={xbox} 
                    className="nav-menu-tag-icon" 
                    style={{ width: '20px', height: '20px' }} 
                    alt="Xbox"
                />
                <span className="nav-menu-tag-text">xbox</span>
            </Link>
            <Link
                to={`/switch`}
                key={'switch'}
                className="nav-menu-tag-button"
            >
                <img 
                    src={nswitch} 
                    className="nav-menu-tag-icon" 
                    style={{ width: '20px', height: '20px' }} 
                    alt="Nintendo Switch"
                />
                <span className="nav-menu-tag-text">switch</span>
            </Link>
            <Link
                to={`/pc`}
                key={'pc'}
                className="nav-menu-tag-button"
            >
                <img 
                    src={pc} 
                    className="nav-menu-tag-icon" 
                    alt="PC"
                />
                <span className="nav-menu-tag-text">pc</span>
            </Link>
            <Link
                to={`/mobile`}
                key={'mobile'}
                className="nav-menu-tag-button"
            >
                <img 
                    src={mobile} 
                    className="nav-menu-tag-icon" 
                    alt="Mobile"
                />
                <span className="nav-menu-tag-text">mobile</span>
            </Link>
            <Link
                to={`/retro`}
                key={'retro'}
                className="nav-menu-tag-button"
            >
                <img 
                    src={retro} 
                    className="nav-menu-tag-icon" 
                    alt="Retro"
                />
                <span className="nav-menu-tag-text">retro</span>
            </Link>
        </div>
    </div>
)

export default NavMenu;