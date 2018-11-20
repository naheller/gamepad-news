import React, { PureComponent } from 'react'

class Comments extends PureComponent {
    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    componentDidMount() {
        const s = document.createElement('script')
        s.src = '//just-comments.com/w.js'
        s.setAttribute('data-timestamp', + new Date())
        this.ref.current.appendChild(s)
    }

    render() {
        return (
            <>
                <div
                    ref={this.ref}
                    className="just-comments"
                    data-apikey="173270bb-8067-414d-8b73-0a4225fe5656">
                </div>
                {/* <script async src="https://just-comments.com/w.js"></script> */}
            </>
        )
    } 
}

export default Comments