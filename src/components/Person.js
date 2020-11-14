import React, { Component } from 'react';
import PropTypes from 'prop-types'


//const Person = => 
//	<span>{this.props.person.name}</span>

class Person extends Component {
	constructor(props){
		super(props)
		this.state = {
			loaded: false,
			data: null,
			id: null,
		}
		this._isMounted = false
//		this.loadData = this.loadData.bind(this)
//		this.getPersonName = this.getPersonName.bind(this)
	}




//	componentWillUnmount(){
//	 	this._isMounted = false
//	}
	render(){
		
		return(
			
			<div className="cast-person-info">{this.props.person.name}</div>
			
		)
	}
}

Person.propTypes= {
	person: PropTypes.array,
}

export default Person