import React from 'react';

const Similar = ({title, poster}) => 
  <div  className='similar-film'>
  	<div className="similar-film-row">    
    	<div className='clearfix similar-title similar-list-cell' >{title}</div>
    </div>
    <div className="similar-film-row">
    <img className='clearfix similar-poster similar-list-cell' src={'https://image.tmdb.org/t/p/w300/'+poster} alt={title} /> 
    </div>
  </div>


export default Similar
