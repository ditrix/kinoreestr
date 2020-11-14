import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {formatDescription} from '../functions' 
import {Spinner} from './Spinner' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'

import noimage from '../img/noimage.png'

// eslint-disable-next-line
import axios from 'axios'


class DataGrid extends Component {
    constructor(props){
        super(props)
        this.state = {
          loaded: false,
          data: null,
          url: this.props.url,
        }
        this.loadData = this.loadData.bind(this)
        this.handleMoreInfoClicked = this.handleMoreInfoClicked.bind(this)
        this.refClick = this.refClick.bind(this)
    }

 
    componentDidUpdate =() => {

        if(this.state.url !== this.props.url){
            this.loadData()
        }
    }

    loadData = () =>  {
        //this.setState({loaded: false})
       fetch(this.props.url)
            .then(resp => resp.json()) // Transform the data into json
            .then(data => {
                this.setState({loaded: true, data: data, url: this.props.url})
                   this.props.pages(this.state.data.total_pages)
                   
               })
            .catch(error => console.log('error',error) )   
    

    // axios(this.props.url)
    //     .then(response => {
    //         console.log('axios.response.results ',response.data.results)
    //         console.log('axios.response.total_pages ',response.data.total_pages)
    //         this.setState({loaded: true, data: response.data.results, url: this.props.url})
    //         this.props.pages(response.data.total_pages)
    //      })
    //      .catch(error=>console.lof('get grid error: ',error)) 

    }
    
    componentDidMount = () => this.loadData(this.props.url)

    componentWillReceiveProps(nextProps){   
        if(this.state.url !== nextProps.url){
           
            fetch(nextProps.url)
            .then(resp => resp.json()) // Transform the data into json
            .then(data => {
                this.setState({loaded: true, data: data, url: nextProps.url})
                nextProps.pages(this.state.data.total_pages)
                   
               })
            .catch(error => console.log('error',error) )   
        }
        
       
    }

    componentWillUnmount = () => this.setState({data: null, loaded: false, url: null})
    handleMoreInfoClicked = e => this.props.getDetail(e.target.value)
    refClick = value =>  this.props.getDetail(value)
    

    render(){
        
        return(
        
            (this.state.loaded) ? 
            <div className="film-list">
             { 
                this.state.data.results.map( (film,index) =>
                    (film)?
                    <div key={index} className="film-grid">
                        <div className="film-grid-wrapper">
                            <div className="film-grid-title">
                            <button type='button' className="link-button"  onClick={(e) => { e.preventDefault(); this.refClick(film.id);} }>
                                    <FontAwesomeIcon icon={faBookOpen} />
                            </button>
                            {film.title} 
                            </div>
                            <div className="film-grid-poster" onClick={(e) => { e.preventDefault(); this.refClick(film.id);} }>
                                {(film.poster_path)?
                                    <img src={'https://image.tmdb.org/t/p/w300/'+film.poster_path} alt={film.title} />
                                    :<img src={noimage} alt={film.title} />
                                }
                            </div>
                            <div className="film-grid-description">
                                <p>{formatDescription(film.overview)}</p>        
                            </div>
                            <div className="film-grid-more"> 
                                <button type='button' className="link-button"  onClick={(e) => { e.preventDefault(); this.refClick(film.id);} }>
                                    <FontAwesomeIcon icon={faBookOpen} />
                                </button>
                            </div>
                        </div>
                    </div>:<></>
                )}   
            </div>      
            :<Spinner />
            
        )

    }
}


DataGrid.propTypes = {
    url: PropTypes.string.isRequired,
    getDetail: PropTypes.func.isRequired,
    pages: PropTypes.func,    
}


export default DataGrid;