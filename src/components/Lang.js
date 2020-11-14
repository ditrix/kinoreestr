import React, { Component } from 'react';

class Lang extends Component {
    constructor(){
        super()
    }

    setLang(e){
        this.props.setLang(e.currentTarget.value)
    }

    render(){
        return(
            <select onChange={this.setLang.bind(this)}>
                <option value="en">Eng</option>
                <option value="ru">Rus</option>
            </select>
        )
    }
}

export default Lang