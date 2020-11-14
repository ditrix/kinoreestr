import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Person from './Person'

import { _I18N } from '../lib/i18n';
import {MSG} from '../lib/messages'


class CastList extends Component {
	constructor(props){
		super(props)
		this._isMounted = false;
	}

	componentDidMount(){
		this._isMounted = true
	}


	componentWillUnmount(){
		this._isMounted = false
	}

	render(){
		//console.log('crew ',this.props.person.crew)
		const crew = this.props.person.crew
		const cast = this.props.person.cast
		return(
				<>		
					<div className="crew-wrapp">	
					
						{
						(crew)&&
					 	<ul>
					 	{
					 		crew.map((crew,key) => 
				 				
					 			(crew.job === 'Director' && key < 2)&&
						 			 <li key={key}>
						 			 	{_I18N(MSG.DIRECTOR,this.props.lang)}&nbsp;
										  	<Person person={crew} department='crew' />
						 			 </li>
						 		
					 		)	
					 	}	
					 	</ul>
					 	}
					</div>
						
					{
						(cast)&&
						<div className="cast-list-wrapper">
						<span>{_I18N(MSG.CAST,this.props.lang)}&nbsp;</span>
						<ul>
					 	{
					 		cast.map((cast,key) =>
				 			
					 			(key < 5 )&& 
						 			 <li key={key}>
						 				
						 				{/*{cast.name}*/}
						 				<Person person={cast} department='cast' />
						 			 </li>

					 				
					 		
					 		)
					 	}	
					 	</ul>
					 	</div>
					 }
					 	
				</>
		)
	}
}

CastList.propTypes = {
	person: PropTypes.object
}

export default CastList;
