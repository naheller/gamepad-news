import React, { Component } from 'react'
import _ from 'lodash'

import Button from 'react-bootstrap/lib/Button'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Overlay from 'react-bootstrap/lib/Overlay'
import Tooltip from 'react-bootstrap/lib/Tooltip'

class ShareButtons extends Component {
    constructor(props) {
        super(props)
        this.attachRef = target => this.setState({ target });
        this.state = {
            showCopyLinkOverlay: false
        }
    }

    componentDidUpdate() {
        if (this.state.showCopyLinkOverlay) {
            setTimeout(() => {
                this.setState({
                    showCopyLinkOverlay: false
                })
            }, 1500);
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
            showCopyLinkOverlay: !this.state.showCopyLinkOverlay 
        })
    };

    render() {
        const { showCopyLinkOverlay, target } = this.state;
        const slug = this.props.slug
        const title = this.props.title

        return (
            <ButtonGroup>
                <Button
                    key="fb-share-button"
                    variant="light"
                    aria-label="Share on facebook"
                    onClick={() => window.open(
                        `https://www.facebook.com/sharer.php?u=https://gamepad.news/${slug}`, '_blank', 'top=250,left=250,width=555,height=326'
                    )}
                >
                    <span className="icon">
                        <i className="fab fa-facebook-f" />
                    </span>
                </Button>
                <Button 
                    key="twitter-share-button"
                    variant="light"
                    aria-label="Share on twitter"
                    onClick={() => window.open(
                        `https://twitter.com/intent/tweet?url=https://gamepad.news/${slug}`, '_blank', 'top=250,left=250,width=500,height=300'
                    )}
                >
                    <span className="icon">
                        <i className="fab fa-twitter" />
                    </span>
                </Button>
                <Button 
                    key="reddit-share-button"
                    variant="light"
                    aria-label="Share on reddit"
                    onClick={() => window.open(
                        `https://www.reddit.com/submit?url=https://gamepad.news/${slug}&title=${_.replace(title, '', '%20')}`, '_blank', 'width=610,height=600'
                    )}
                >
                    <span className="icon">
                        <i className="fab fa-reddit-alien" />
                    </span>
                </Button>
                {
                    this.props.showAll && (
                        <Button 
                            key="icon-mail"
                            variant="light"
                            aria-label="Share via email"
                            onClick={() => window.open(
                                `mailto:?subject=${title}&body=https://gamepad.news/${slug}`
                            )}
                        >
                            <span className="icon">
                                <i className="far fa-envelope" />
                            </span>
                        </Button>
                    )
                }
                {
                    this.props.showAll && [
                        <Button 
                            key="icon-link"
                            variant="light"
                            aria-label="Copy page link"
                            ref={this.attachRef}
                            onClick={() => this.copyToClipboard(`https://gamepad.news/${slug}`)}
                        >
                            <span className="icon">
                                <i className="fas fa-link" />
                            </span>
                        </Button>,
                        <Overlay target={target} show={showCopyLinkOverlay} placement="bottom">
                            {props => <Tooltip {...props}>Copied link</Tooltip>}
                        </Overlay>
                    ]
                }
            </ButtonGroup>
        )
    }
}

export default ShareButtons