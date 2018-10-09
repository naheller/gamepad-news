import React, { Component } from 'react'
import _ from 'lodash'

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
            <div>
                <button
                    key="fb-share-button"
                    aria-label="Share on facebook"
                    onClick={() => window.open(
                        `https://www.facebook.com/sharer.php?u=https://gamepad.news/${slug}`, '_blank', 'top=250,left=250,width=555,height=326'
                    )}
                >
                    <span className="icon">
                        <i className="fab fa-facebook-f" />
                    </span>
                </button>
                <button 
                    key="twitter-share-button"
                    aria-label="Share on twitter"
                    onClick={() => window.open(
                        `https://twitter.com/intent/tweet?url=https://gamepad.news/${slug}`, '_blank', 'top=250,left=250,width=500,height=300'
                    )}
                >
                    <span className="icon">
                        <i className="fab fa-twitter" />
                    </span>
                </button>
                <button 
                    key="reddit-share-button"
                    aria-label="Share on reddit"
                    onClick={() => window.open(
                        `https://www.reddit.com/submit?url=https://gamepad.news/${slug}&title=${_.replace(title, '', '%20')}`, '_blank', 'width=610,height=600'
                    )}
                >
                    <span className="icon">
                        <i className="fab fa-reddit-alien" />
                    </span>
                </button>
                {
                    this.props.showAll && (
                        <button 
                            key="icon-mail"
                            aria-label="Share via email"
                            onClick={() => window.open(
                                `mailto:?subject=${title}&body=https://gamepad.news/${slug}`
                            )}
                        >
                            <span className="icon">
                                <i className="far fa-envelope" />
                            </span>
                        </button>
                    )
                }
                {
                    this.props.showAll && (
                        <button 
                            key="icon-link"
                            aria-label="Copy page link"
                            ref={this.attachRef}
                            onClick={() => this.copyToClipboard(`https://gamepad.news/${slug}`)}
                        >
                            <span className="icon">
                                <i className="fas fa-link" />
                            </span>
                        </button>
                    )
                }
            </div>
        )
    }
}

export default ShareButtons