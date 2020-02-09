import React, { Component } from 'react'
import './styledash.css'
import NavBar from './navbar.js'
import Display from './display.js'

export default class browse extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            currentURL:"browse",
            artist:"",
            playingBar:false
        }
    }
    
    render() {
        return (
            <div id="mainContainer"> 
                <div id="topContainer">
                    <NavBar/>
                    <Display arr={this.props.arr} artistArr={this.props.artistArr} currentURL={this.state.currentURL}/>
                </div>
                
            </div>
        )
    }
}
