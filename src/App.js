import React, { Component } from 'react';
/* import logo from './logo.svg'; */

import './App.css';
import './css/style.css'
import './css/record.css'


import Main from './components/Main'

//import Album from './components/Album' 

class App extends Component {
  constructor(props){
    super(props)
    this.state={
    no: 1,
    total: 10,
  }
  
}


 
  render() {
    return (

      <div className="App">
      <Main />
      

      </div>
    );
  }
}

export default App;
