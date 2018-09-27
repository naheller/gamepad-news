import React, { Component } from 'react'
import { Button } from 'antd'
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

    copyToClipboard(string) {
        const textInput = document.createElement('textarea')
        textInput.value = string
        document.body.appendChild(textInput)

        textInput.select()
        document.execCommand('copy')
        document.body.removeChild(textInput)

        this.setState({
            copyLinkDisplay: 'inline'
        })
    };

    render() {
        const slug = this.props.slug
        const title = this.props.title

        return (
            <Button.Group style={{ marginBottom: '1.5rem' }}>
                <Button 
                    // type="default"
                    key="fb-share-button"
                    size="large"
                    onClick={() => window.open(
                        `https://www.facebook.com/sharer.php?u=https://gamepad.news/${slug}`, '_blank', 'top=250,left=250,width=555,height=326'
                    )}
                >
                    <span 
                        className="icon"
                    >
                        <i className="fab fa-facebook-f" />
                    </span>
                </Button>
                <Button 
                    key="twitter-share-button"
                    size="large"
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
                    size="large"
                    onClick={() => window.open(
                        `https://www.reddit.com/submit?url=https://gamepad.news/${slug}&title=${_.replace(title, '', '%20')}`, '_blank', 'width=610,height=600'
                    )}
                >
                    <span className="icon">
                        <i className="fab fa-reddit-alien" />
                    </span>
                </Button>
                {
                    this.props.showAll && [
                        <Button 
                            key="icon-mail"
                            size="large"
                            onClick={() => window.open(
                                `mailto:?subject=${title}&body=https://gamepad.news/${slug}`
                            )}
                        >
                            <span className="icon">
                                <i className="far fa-envelope" />
                            </span>
                        </Button>,
                        <Button 
                            key="icon-link"
                            size="large"
                            onClick={() => this.copyToClipboard(`https://gamepad.news/${slug}`)}
                        >
                            <span className="icon">
                                <i className="fas fa-link" />
                            </span>
                        </Button>
                    ]
                }
            </Button.Group>
        )
    }
}

export default ShareButtons