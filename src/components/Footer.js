import React from 'react'
import Link from 'gatsby-link'
import gamepad from '../../static/svg/gamepad-tomato.svg'

const Footer = () => (
    <footer className="footer has-background-grey-lightest">
        <div className="has-text-centered">
            <Link to='/'>
                <img 
                    src={gamepad}
                    alt="Gamepad News"
                    style={{ width: '1.75rem' }}
                />
            </Link>
        </div>
    </footer>
)

export default Footer