import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {getGenresUrl} from '../functions'

import {_I18N} from '../lib/i18n'
import {MSG} from '../lib/messages'

class Filter extends Component {
    constructor(props){
        super(props)
        this.state = {
            years:[],
            genres: [],
            options: {
                year: '',
                genre: '',
                sort: 'popularity.desc'
            },
            lang: this.props.lang
        }
        this.handleYearChange = this.handleYearChange.bind(this)
 
    
        this.setFilter = this.setFilter.bind(this)
    } 


    handleYearChange = event => {
        const options = this.state.options;
        options.year = event.target.value
        this.setState({options: options})
        this.props.getFilter(this.state.options)
    }

    handleSortOptionChange = event => {
        const options = this.state.options;
        options.sort = event.target.value
        this.setState({options: options})
        this.props.getFilter(this.state.options)
    }

    handleGenreOptionChange = event => {
        const options = this.state.options;
        options.genre = event.target.value        
        this.setState({options: options})
        this.props.getFilter(this.state.options)
    }


    componentDidMount = () => {
        const setRes = (res) => {
            this.setState({genres: res.genres})
        }
        this.setState({lang:this.props.lang})
        fetch(getGenresUrl())
        .then(resp => resp.json())
        .then(res => setRes(res))
        .catch(err => console.log('error')) 

        let years=[]
       for(var year = 2019; year >= 1900; year--){
            years.push(''+year)
           
        }
        this.setState({years:years})
        
    }


    componentWillReceiveProps(nextProps){
        
        fetch(getGenresUrl(_I18N(MSG.LOCALE,nextProps.lang)))
        .then(resp => resp.json())
        .then(res => this.setState({genres: res.genres}))
        .catch(err => console.log('error')) 
    }

    setFilter(){
        this.props.getFilter(this.state.options)   
    }

    render(){
        return(
          <div className="filter-form">

            <div className="input-form-item">
            
            <select id='get-sort-by' onChange={this.handleSortOptionChange.bind(this)} className="filter-item">
                    <option value=''>{_I18N(MSG.SORT_BY,this.props.lang)}</option>
                    <option value='popularity.desc'>{_I18N(MSG.POPULARITY_DESC,this.props.lang)}</option>
                    <option value='popularity.asc'>{_I18N(MSG.POPULARITY_ASC,this.props.lang)}</option>
                    <option value='vote_count.desc'>{_I18N(MSG.VOTE_COUNT_DESC,this.props.lang)}</option>
                    <option value='vote_count.asc'>{_I18N(MSG.VOTE_COUNT_ASC,this.props.lang)}</option>
                    <option value='release_date.desc'>{_I18N(MSG.RELEASE_DATE_DESC,this.props.lang)}</option>
                    <option value='release_date.asc'>{_I18N(MSG.RELEASE_DATE_ASC,this.props.lang)}</option>
                    <option value='original_title.asc'>{_I18N(MSG.ORIGRNAL_TITLE_ASC,this.props.lang)}</option>
                    <option value='original_title.desc'>{_I18N(MSG.ORIGRNAL_TITLE_ASC,this.props.lang)}</option>
                    <option></option>
            </select>
            </div>

            <div className="input-form-item">
                {/* <div>
            { this.state.genres.map((genre, key) => 
                        <div key={key} value={genre.id} >{genre.name}</div>
                )}
                </div> */}
            <select  id='get-genre' onChange={this.handleGenreOptionChange.bind(this)}> 
                <option value="">{_I18N(MSG.ALL_GENRES,this.props.lang)}</option>
                { this.state.genres.map((genre, key) => 
                        <option key={key} value={genre.id} >{genre.name}</option>
                )}
                <option></option>
            </select>
            </div>
           
          </div>
       ) 

    }
}

Filter.propTypes = {
    getFilter: PropTypes.func,
}



export default Filter