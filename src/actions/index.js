export const CREATE_ENTRY = 'CREATE_ENTRY'
function createEntry(title, content) {
  return {
	type: 'CREATE_ENTRY',
    title,
    content
  }
}

export const DELETE_ENTRY = 'DELETE_ENTRY'
function deleteEntry(id) {
  return {
	type: 'DELETE_ENTRY',
    id
  }
}

export const SELECT_ENTRY = 'SELECT_ENTRY'
function selectEntry(id) {
  return {
    type: 'SELECT_ENTRY',
    id
  }
}

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
function receiveEntries(entries) {
  return {
    type: RECEIVE_ENTRIES,
    entries: json.data.children.map(child => child.data)
  }
}

export function fetchEntries() {
  return function(dispatch) {
	let init = { method: 'GET'};
    return fetch('/api', init)
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(receiveEntries(json))
      )
  }
}