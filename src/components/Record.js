import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {getMovieDetailUrl, getTvShowDetailUrl,
  getFormatedDate, getFormatYear, getCastUrl, getSimilarMovie, getSimilarTV, getVideoUrl} from '../functions'
import  { MOVIE_REC,  TVSHOW_REC } from '../actions'
import SimilarList from './SimilarList'
import CastList from './CastList'
import {Spinner} from './Spinner'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { _I18N } from '../lib/i18n';
import {MSG} from '../lib/messages'



class Record extends Component {
  constructor(props){
    super(props)
    this.state = {
      current: null,
      data: null,
      video: '',
      loaded: false,
      cast: null,
      castLoaded: false,
      similar: null,
      similarLoaded: false,
      videoDataLoaded: false,
      locale: '',
      action: this.props.action
    }			
    this._isMounted = false

    this.handleBackClicked = this.handleBackClicked.bind(this)
    this.loadData = this.loadData.bind(this)
    this.similarClicked = this.similarClicked.bind(this)
    this.dataLoaded = this.dataLoaded.bind(this)
    this.loadCast = this.loadCast.bind(this) 
    this.loadSimilar = this.loadSimilar.bind(this)
  }

  dataLoaded = () =>  {
    return this.state.loaded  
          && this.state.similarLoaded 
          && this.state.castLoaded
         // && this.state.videoDataLoaded
  }



  loadData = url => {
    // console.log(url)
    this._isMounted &&
      fetch(url)
        .then(resp => resp.json()) // Transform the data into json
        .then(data => this.setState({loaded: true, data: data, current: this.props.recordId}))
        .catch(err => console.log('load detail error'))   
  }      

  componentWillReceiveProps(nextProps){   
    if(this.state.locale !== nextProps.locale){
      this.setState({locale:nextProps.locale})
      this.loadData((nextProps.action === MOVIE_REC)? 
      getMovieDetailUrl(nextProps.recordId,nextProps.locale) 
      :getTvShowDetailUrl(nextProps.recordId,nextProps.locale))
      this.loadCast(nextProps.locale)
      this.loadSimilar(nextProps.locale)
      this.loadVideoUrl(nextProps.locale)    
      
    }
  }

  componentDidMount = () => {
   // console.log(this.props.locale)
    this.setState({locale:this.props.locale})
    this._isMounted = true
    this.loadData((this.props.action === MOVIE_REC)? 
      getMovieDetailUrl(this.props.recordId,this.props.locale) 
      :getTvShowDetailUrl(this.props.recordId,this.props.locale))
    this.loadCast(this.props.locale)
    this.loadSimilar(this.props.locale)
    this.loadVideoUrl(this.props.locale)
  }

  loadVideoUrl = (locale) => {
    fetch(getVideoUrl(this.props.recordId,locale))
      .then(resp => resp.json())
      .then(data => {
        this.setState({video: `https://www.youtube.com/embed/${data.results[0].key}`, videoDataLoaded:true})
    })
  }


  loadCast(locale){

      const url = (this.props.action === MOVIE_REC)?  
                    getCastUrl('movie',this.props.recordId,locale):
                    getCastUrl('tv',this.props.recordId,locale)
      this._isMounted &&
      fetch(url)
        .then(resp => resp.json()) // Transform the data into json
        .then(data => this.setState({castLoaded: true, cast: data}))
        .catch(err => console.log('load cast error'))   

  }

  loadSimilar(locale){
      const url = (this.props.action === MOVIE_REC)?  
        getSimilarMovie(this.props.recordId,locale):
        getSimilarTV(this.props.recordId,locale)
      this._isMounted &&

      fetch(url)  
        .then(resp => resp.json()) // Transform the data into json
        .then(data => {this.setState({similarLoaded: true, similar: data.results})})
        .catch(err => console.log('load similar error'))   

  }


  componentDidUpdate(){
    
    this._isMounted = true
    if(this.state.current !== this.props.recordId){
      this.setState({current:this.props.recordId})
      this.loadData((this.props.action === MOVIE_REC)? 
                      getMovieDetailUrl(this.props.recordId,this.props.locale) : 
                      getTvShowDetailUrl(this.props.recordId,this.props.locale))
      this.loadVideoUrl(this.props.locale)                
      this.loadCast(this.props.locale)
      this.loadSimilar(this.props.locale)
     } 
  }

   componentWillUnmount(){
     this._isMounted = false
    this.setState({current:null, loaded: false, data: null, videoDataLoaded: false, video:''})
  }

  handleBackClicked = e => this.props.backToList(this.props.action)
  similarClicked = value => this.props.getSimilarRecord(value)    

  render(){
  //  console.log('Record: ', this.state.data)
    const film = this.state.data
    return(
      <React.Fragment>
        <div className="data-wrap-record ">
        {

    (this.dataLoaded()) ?

          <div className="film-record">
            <header> 
                  <div className="btn-back-wrap">
                   
                        <button type='button' className="btn-record-back link-button"  onClick={this.handleBackClicked}>
                        <FontAwesomeIcon  icon={faWindowClose} size="2x" />
                  
                        </button>
                  </div>
            {
            (this.props.action === TVSHOW_REC)?                
              <div className="film-rec-title clearfix">{film.name}</div>:
              <div className="film-rec-title clearfix">{film.title} &nbsp;<span>({getFormatYear(film.release_date)})</span></div>   
            }
            </header>
           <div className="film-info-wrap">
            <div className="film-rec-poster clearfix">
              <img src={'https://image.tmdb.org/t/p/w300/'+film.poster_path} alt={film.title} />
            </div>  
            <div className="film-rec-info">
              <div className="film-rec-popularity">{_I18N(MSG.RATING,this.props.lang)} <span>{film.vote_average*10}%</span>
              </div>  

              {(this.props.action === TVSHOW_REC)?
                <div className="tv-show-info">
                  <div className="film-rec-release-date">дата выхода {getFormatedDate(film.first_air_date)}</div>
                  <div className="film-rec-number-of-seasons">эпизодов: {film.number_of_seasons}</div>
                </div>  
              : <div>&nbsp;</div>
              }
                
                <div className="rec-genres">
                  {(film.genres)? film.genres.map((genre,i) =>
                  <span key={i}>{genre.name}</span>):<span></span>
                  }
                
                </div>

             
              {
              (this.props.action === MOVIE_REC)&&(
              <div className="film-rec-countries">
                {(film.production_countries)&&<span>{_I18N(MSG.PRODUCTION,this.props.lang)}</span>}
                <ul>
                {(film.production_countries)? film.production_countries.map((country,i)=>
                  <li key={i}>{country.name}</li>):<span></span>
                }
                </ul>
              </div>)

              }
              <div className='cast-list'>
               
               {(this.state.castLoaded)? 
                <span>

                  <CastList person={this.state.cast} lang={this.props.lang} />
                </span>:
                <span>loading...</span>
               }
              </div>
            </div>
           </div>
            <div className="film-rec-description"><p>{film.overview}</p></div>
            <footer>&nbsp;</footer>
          </div>// film-record
            :
          <div>loading...</div>	
        }

        </div>
        

       
          {
            (this.state.similarLoaded)? 
                <div className="similar-films-wrap">
                <SimilarList action={this.props.action} lang={this.props.lang} similar={this.state.similar}  similarClicked={this.similarClicked}/>
                </div>
            
            :<Spinner />
          }
        
        {(this.state.video)?
        <div className="poster">
          <iframe title="this.state.current"  width="640" height="360" src={this.state.video} frameBorder="0" allowFullScreen></iframe>          
        </div> :<></>}
        
       
        
        
      </React.Fragment>
    )
  }
}


Record.propTypes = {
  backToList: PropTypes.func.isRequired,  
  getSimilarRecord: PropTypes.func.isRequired,
  recordId: PropTypes.number.isRequired,
  action: PropTypes.number.isRequired,
}

export default Record