import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {getPagerData} from '../functions'
import {MAX_PAGES} from '../constants'

class Pager extends Component {
constructor(props){
  super(props)
    this.state = { no: 1, 
      pages: this.props.total/20, 
      items:[]}
      this.handleClicked = this.handleClicked.bind(this)
    }
  handleClicked = event => {
    if(event.target.value !== '...') {
      this.props.current(event.target.value)
      this.setState({no: event.target.value})
    }
  }

  render(){
    let total = Math.ceil(this.props.total/20);
    if(total>MAX_PAGES) { total = MAX_PAGES }
      const items = getPagerData(this.state.no, total)
    return(
      <ul className="pagination">
        { items.map((item,i) => 
            <li key={i} >
              <button type='button' className="link-button" onClick={this.handleClicked} value={item}>
              {item}
              </button>
            </li>    
          )}
      </ul>
    )
  }
}

Pager.propTypes = {
  total: PropTypes.number,
}

export default Pager