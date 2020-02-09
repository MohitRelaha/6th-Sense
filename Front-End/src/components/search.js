import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import AllSongs from './allsongs'
import AllArtist from './allArtists'
import './styledash.css'

class Search extends Component {

    constructor(){
        super()
        this.state={
            searchSongArray:[],
            searchArtistArray:[]
        }
        this.searchItem = this.searchItem.bind(this)
    }

    searchItem(event){
        //console.log("Value :" + event.target.value)
        let searchValue = event.target.value.toLowerCase()
        if(searchValue === ""){
            this.setState({
                searchSongArray:[],
                searchArtistArray:[]
            })
        }
        else{
            let newSongArray = this.props.arr.filter(item => item.metadata.songname.toLowerCase().indexOf(searchValue) > -1)
            let newArtistArray = this.props.artistArr.filter(item => item.filename.toLowerCase().indexOf(searchValue) > -1)
            this.setState({
                searchSongArray:newSongArray,
                searchArtistArray:newArtistArray
            })
        }
        
    }

    render() {    
        return (
            <div>
                <div class="searchContainer">
                    <h4>Search for Song, Artist or Album</h4>
                    <input type="text" class="searchInput" placeholder="Start typing" onKeyUp={this.searchItem}/>
                </div>
                            
                <div>
                    <AllSongs arr={this.state.searchSongArray} play={this.props.play} pause={this.props.pause} stop={this.props.stop} artistSelected={this.props.artistSelected} langSelected={this.props.langSelected}/>
                    <AllArtist artistArr={this.state.searchArtistArray} stopIt={this.props.stopIt}/>    
                </div>
            </div>
        )
    }
}

export default Search