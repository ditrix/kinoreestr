import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {_I18N} from '../lib/i18n'
import {MSG} from '../lib/messages'


class Search extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            query: '',
        }
   
    }

    componentWillMount(){
        this.setState({query: this.props.query})
    }

 
    setQuery( event ){
        event.preventDefault()
        this.setState({query: event.target.value})
    }         
    handleSearch = () => {
        this.props.searchData(this.state.query)
    }

    handleClear= () => {
        this.setState({query:''})
        this.props.searchData(null)
    }
    
    handleKeyDown(e){
        if(e.keyCode === 13){
            e.preventDefault()
            this.handleSearch(e)
        }
    }

    render(){
        return(
            <form className='search-form'>
            <table border="0" cellSpacing="0" cellPadding="0">
                <tbody>
                    <tr>
                        <td>
                            <input type="text" 
                                onClick={this.handleClear.bind(this)} 
                                value={this.state.query} 
                                placeholder={_I18N(MSG.SEARCH,this.props.lang)} 
                                onChange={this.setQuery.bind(this)} 
                                onKeyDown={this.handleKeyDown.bind(this)}
                            />
                        </td>
                        <td>
                            <div className="search-button">
                                <FontAwesomeIcon 
                                    icon={faSearch} 
                                    onClick={this.handleSearch.bind(this)} 
                                />
                            </div>
                            
                        </td>
                    </tr>
                </tbody>
            </table>    
      </form>
            // <div className="search-form">
            //     <input type="text" className="search-input" onChange={this.setQuery} onClick={this.handleClear} value={this.state.query} />
            //     <i className="material-icons search-button" onClick={this.handleSearch}>search</i>
            // </div>
        )
    }
}

export default Search