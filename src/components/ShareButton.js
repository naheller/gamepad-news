import React, { PureComponent } from 'react'
import _ from 'lodash'

import '../../static/fontello/css/fontello.css'
import './ShareButton.scss'

class ShareButton extends PureComponent {
    constructor(props) {
        super(props)
        this.attachRef = target => this.setState({ target });

        this.state = {
            showCopyLinkOverlay: false
        }

        this.slug = props.slug
        this.title = props.title
    }

    componentDidUpdate() {
        if (this.state.showCopyLinkOverlay) {
            setTimeout(() => {
                this.setState({
                    showCopyLinkOverlay: false
                })
            }, 2000);
        }
    }

    copyToClipboard(string) {
        const textInput = document.createElement('textarea')
        textInput.value = string
        document.body.appendChild(textInput)

        textInput.select()
        document.execCommand('copy')
        document.body.removeChild(textInput)

        this.setState({ 
            showCopyLinkOverlay: true
        })
    };

    showFacebook = () => (
        <div
            key="fb-share-button"
            className="share-button"
            title="Share on Facebook"
            aria-label="share on facebook"
            onClick={() => window.open(
                `https://www.facebook.com/sharer.php?u=https://gamepad.news/${this.slug}`, '_blank', 'top=250,left=250,width=555,height=326'
            )}
        >
            <span className="icon">
                <i className="icon-facebook-squared" />
            </span>
            {this.props.text && <p className="text">Share</p>}
        </div>
    )

    showTwitter = () => (
        <div 
            key="twitter-share-button"
            className="share-button"
            title="Share on Twitter"
            aria-label="share on twitter"
            onClick={() => window.open(
                `https://twitter.com/intent/tweet?url=https://gamepad.news/${this.slug}`, '_blank', 'top=250,left=250,width=500,height=300'
            )}
        >
            <span className="icon">
                <i className="icon-twitter-squared" />
            </span>
            {this.props.text && <p className="text">Tweet</p>}
        </div>
    )

    showReddit = () => (
        <div 
            key="reddit-share-button"
            className="share-button"
            title="Share on reddit"
            aria-label="share on reddit"
            onClick={() => window.open(
                `https://www.reddit.com/submit?url=https://gamepad.news/${this.slug}&title=${_.replace(this.title, '', '%20')}`, '_blank', 'width=610,height=600'
            )}
        >
            <span className="icon">
                <i className="icon-reddit-alien" />
            </span>
            {this.props.text && <p className="text">Post</p>}
        </div>
    )

    showMail = () => (
        <div 
            key="mail-share-button"
            className="share-button"
            title="Share via email"
            aria-label="share via email"
            onClick={() => window.open(
                `mailto:?subject=${this.title}&body=https://gamepad.news/${this.slug}`
            )}
        >
            <span className="icon">
                <i className="icon-mail" />
            </span>
            {this.props.text && <p className="text">Email</p>}
        </div>
    )

    showCopyLink = () => {
        const opacity = this.state.showCopyLinkOverlay ? 'show' : ''

        return (
            <div 
                key="copy-link-button"
                className="share-button"
                title="Copy page link"
                aria-label="copy page link"
                ref={this.attachRef}
                onClick={() => this.copyToClipboard(`https://gamepad.news/${this.slug}`)}
            >
                <span className="icon">
                    <i className="icon-link-1" />
                </span>
                {this.props.text && <p className="text">Copy link</p>}
                {/* <h6 className={`link-tooltip ${opacity}`}>
                    Link copied
                </h6> */}
            </div>
        )
    }

    render() {
        // const { showCopyLinkOverlay, target } = this.state;

        if (this.props.facebook) {
            return this.showFacebook()
        } else if (this.props.twitter) {
            return this.showTwitter()
        } else if (this.props.reddit) {
            return this.showReddit()
        } else if (this.props.mail) {
            return this.showMail()
        } else if (this.props.link) {
            return this.showCopyLink()
        }
    }
}

export default ShareButton