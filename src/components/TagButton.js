import React from 'react'
import { Link } from 'gatsby'
import _ from 'lodash'

import './TagButton.scss'

const TagButton = ({ tag }) => (
    <Link 
        to={`/${_.kebabCase(tag)}`} 
        className="tag-button" 
        title={tag}
    >
        {tag}
    </Link>
)

export default TagButton
