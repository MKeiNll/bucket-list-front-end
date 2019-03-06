import React from 'react'
import PropTypes from 'prop-types'
import Entry from './Entry'
import { selectEntry } from '../actions/index'

const EntryList = ({ entries }) => (
  <ul>
    {entries.map(entry => (
      <Entry key={entry.id} {...entry} onClick={() => selectEntry(entry.id)} />
    ))}
  </ul>
)

EntryList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      selected: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
	  content: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  selectEntry: PropTypes.func.isRequired
}

export default EntryList