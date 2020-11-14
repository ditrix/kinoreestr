import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { MAX_SIMILAR  } from '../constants'
import Similar from './Similar'
import {MOVIE_REC} from '../actions'
import {_I18N} from '../lib/i18n'
import {MSG} from '../lib/messages'

class SimilarList extends Component {
  constructor(props){
    super(props)
    this.state = {
      id: null,
      data: null,
      loaded: false,
    }
   // this.loadSimilar = this.loadSimilar.bind(this)
    this.similarClicked = this.similarClicked.bind(this)
    this._isMounted = false
  }

  similarClicked = value => {
    this.props.similarClicked(value)
  }    

 
  componentDidMount(){
    this._isMounted = true
   }

  componentWillUnmount(){
    this._isMounted = false
  }

  render(){
    //const similar = this.state.data
      const similar = this.props.similar
      return(
        <section>             
          {
              (similar)&&
              <div className="similar-list-content">
              <h3>{_I18N(MSG.RECOMENDATIONS,this.props.lang)}</h3>
              <ul className="similar-list">
                {
                  similar.map((similar,index) => 
                    (index++ < MAX_SIMILAR)&&

                        
                      <li key={similar.id}>
                        <button className='clearfix similar-link link-button' type="button" 
                            onClick={ (e) => { 
                              e.preventDefault(); 
                              this.similarClicked(similar.id) 
                            }} 
                            value={similar.id}>
                              <Similar title={(this.props.action ===  MOVIE_REC)? similar.title : similar.name} 
                                  poster={similar.poster_path} 
                              />
                        </button>


                      </li>
                    )
                }
              </ul>
              </div>
           } 
         
            
       
       </section>
        )
    }
}
  
SimilarList.propTypes = {
  action: PropTypes.number.isRequired,
  similar: PropTypes.object, 
  similarClicked: PropTypes.func,
}

export default SimilarList