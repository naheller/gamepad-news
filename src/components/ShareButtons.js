import React, { Component } from 'react'
import _ from 'lodash'

class ShareButtons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            copyLinkDisplay: 'none'
        }
    }

    componentDidUpdate() {
        if (this.state.copyLinkDisplay !== 'none') {
            setTimeout(() => {
                this.setState({
                    copyLinkDisplay: 'none'
                })
            }, 1500);
        }
    }

    copyToClipboard(str) {
        const el = document.createElement('textarea');
        el.value = str;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        this.setState({
            copyLinkDisplay: 'inline'
        })
    };

    render() {
        const slug = this.props.slug
        const title = this.props.title

        return (
            <div className="field is-grouped">
                <button 
                    key="fb-share-button"
                    className="button control is-link is-outlined"
                    onClick={() => window.open(
                        `https://www.facebook.com/sharer.php?u=https://gamepad.news/${slug}`, '_blank', 'top=250,left=250,width=555,height=326'
                    )}
                >
                    <span 
                        className="icon"
                    >
                        <i className="fab fa-facebook-f" />
                    </span>
                </button>
                <button 
                    key="twitter-share-button"
                    className="button control is-info is-outlined"
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
                    className="button control is-danger is-outlined"
                    onClick={() => window.open(
                        `https://www.reddit.com/submit?url=https://gamepad.news/${slug}&title=${_.replace(title, '', '%20')}`, '_blank', 'width=610,height=600'
                    )}
                >
                    <span className="icon">
                        <i className="fab fa-reddit-alien" />
                    </span>
                </button>
                {
                    this.props.showAll && [
                        <button 
                            key="icon-mail"
                            className="button control is-outlined"
                            onClick={() => window.open(
                                `mailto:?subject=${title}&body=https://gamepad.news/${slug}`
                            )}
                        >
                            <span className="icon">
                                <i className="far fa-envelope" />
                            </span>
                        </button>,
                        <button 
                            key="icon-link"
                            className="button control is-outlined"
                            onClick={() => this.copyToClipboard(`https://gamepad.news/${slug}`)}
                        >
                            <span className="icon">
                                <i className="fas fa-link" />
                            </span>
                        </button>,
                        <small 
                            key="copy-link-text"
                            style={{ 
                                alignSelf: 'center', display: `${this.state.copyLinkDisplay}`
                            }}
                        >
                            Copied link
                        </small>
                    ]
                }
            </div>
        )
    }
}

export default ShareButtons