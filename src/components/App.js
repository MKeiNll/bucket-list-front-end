import React from 'react';

class App extends React.Component {
	
	constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      entry: {id:"undefinded", title: "undefined", content: "undefined"}
    };
	}
	
	render() {
      return (
        <div>React is working!!!{this.state.entry.title}{this.state.entry.content}</div>
      );
    }
  
	
	componentDidMount() {	
	let init = { method: 'GET'};
    fetch('/api', init) 
	  .then(res => res.json())
      .then(
        (result) => {
					  console.log(result);
          this.setState({
            isLoaded: true,
            entry: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
}

export default App;