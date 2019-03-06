import React from 'react'
import PropTypes from 'prop-types'

const Entry = ({ onClick, selected, title, content }) => (
  <li
    onClick={onClick}
	style={{
      textDecoration: selected ? 'line-through' : 'none'
    }}
  >
    {title}
	<br />
	{content}
  </li>
)

Entry.propTypes = {
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default Entry