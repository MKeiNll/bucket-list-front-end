import React from 'react';
import EntryList from './EntryList'

const App = ({ fetchedEntries }) => (
	<div>
	 <EntryList entries={fetchedEntries}/>
	</div>
)

export default App;