import {
  CREATE_ENTRY,
  DELETE_ENTRY,
  SELECT_ENTRY,
  RECEIVE_ENTRIES
} from '../actions/index'

const entries = (state = [], action) => {
  switch (action.type) {
    case CREATE_ENTRY:
      return [
        ...state,
        {
          title: action.title,
          content: action.content,
        }
      ]
    case DELETE_ENTRY:
      return [
        ...state,
        {
          id: action.id
        }
      ]
	case SELECT_ENTRY:
	  return state.map(entry =>
        entry.id === action.id ? { ...entry, selected: !entry.selected } : entry
      )
	case RECEIVE_ENTRIES:
	  return [
        ...state,
        {
          entries: action.entries
        }
      ]
    default:
      return state
  }
}

export default entries