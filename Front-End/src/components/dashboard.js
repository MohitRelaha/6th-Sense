import React, { Component } from 'react'
import axios from 'axios';
import NavBar from './navbar.js'
import NowPlaying from './nowplaying.js'
import Display from './display.js'
import './styledash.css'
import $ from "jquery"
import {Link,Route} from 'react-router-dom'
import {withRouter} from 'react-router';

class Dashboard extends Component {

    constructor(){
        super()
        this.state = {
            source : null,
            nowPlaying:false,
            nowPlayingId:0,
            startedAt:0,
            pausedAt:0,
            currentSongId:0,
            currentSongArtist:'Mohit',
            currentSongName:'Bad Words',
            interval:null,
            audioContext:null,
            duration:0,
            mouseDown:false,
            gainNode:null,
            currentURL:"none",
            artistSelected:null,
            arr:[],
            artistArr:[]
            
        }
        this.play = this.play.bind(this)
        this.pause = this.pause.bind(this)
        this.stop = this.stop.bind(this)
        this.formatTime = this.formatTime.bind(this)
        this.progress = this.progress.bind(this)
        this.manualProgress = this.manualProgress.bind(this)
        this.setVolume = this.setVolume.bind(this)
        this.volumeBarProgress = this.volumeBarProgress.bind(this)
        //this.artistBrowsed = this.artistBrowsed.bind(this)
        this.changeURL = this.changeURL.bind(this)
        this.stopIt = this.stopIt.bind(this)
        this.addToList = this.addToList.bind(this)
    }


    componentDidMount(){
        
        /*
        let self = this
        $(window).off('popstate.duck').on('popstate.duck', function(event) {   
            alert("going back") 
            self.stopIt()
           });
        */

       fetch('http://localhost:3005/tracks/metadata')
       .then(res => res.json())   // return json format : actual data is always in form of string
       .then(res => {
         this.setState({arr : res})
         //console.log('arr = ' + this.state.arr)
         //console.log('HOW MANY TIME')
       })

        fetch('http://localhost:3005/tracks/artist')
        .then(res => res.json())   // return json format : actual data is always in form of string
        .then(res => {
            this.setState({artistArr : res})
            //console.log('ArtistArr = ' + this.state.artistArr)
        })


        $(document).ready(function(){
            // taaki wo select na ho icons
            $("#nowPlayingContainer").on("mousedown touchstart mousemove touchmove", function(e){
                e.preventDefault()
            })
            
        })
       
            
    }


    componentDidUpdate(){
        window.onpopstate  = (e) => {
            this.stopIt()
          }
        }

    
    addToList(id,filename){

        if(id !== 0){
            fetch(`http://localhost:3005/users/addtolist?id=${id}&filename=${filename}`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
            })
            .then( res => {
                if(res.ok)
                    return res.json();
            })
            .then(res =>{
                alert('Song Added Successfully');
            })
        }

    }


    stopIt(){
        if(this.state.source !== null && this.state.nowPlaying === true)
        {
            this.state.source.disconnect();
            this.state.source.stop(0);
            this.state.source = null;

            this.state.nowPlaying = false;
        }
    }


    

    changeURL(){
        this.stopIt()
        
        this.setState({
            currentURL:"browse"
        })
        
    }


    // artistBrowsed(artistSelected){
    //     this.setState({
    //         currentURL:"allSongs",
    //         artistSelected:artistSelected
    //     })
    // }

    volumeBarProgress(){
        let prog = this.state.gainNode.gain.value * 100
        console.log("Volume Progress2 = " + prog)
        $(".volumeBar .progress").css("width",prog + "%")
    }

    setVolume(level){
        if(level === 0){
            $(".controlButton.volume").hide();
            $(".controlButton.mute").show();
        }
        else{
            $(".controlButton.volume").show();
            $(".controlButton.mute").hide();
        }
        


        this.state.gainNode.gain.setValueAtTime(level, this.state.audioContext.currentTime)
        setTimeout(()=>{
            console.log("Volume Progress1 = " + this.state.gainNode.gain.value * 100)
            this.volumeBarProgress()
        },500)
        
       }


    progress(){
        $(".progressTime.current").text(this.formatTime(this.state.audioContext.currentTime + this.state.pausedAt / 1000))
        $(".progressTime.remaining").text(this.formatTime(this.state.duration - this.state.audioContext.currentTime - this.state.pausedAt / 1000))
        
        var prog = (this.state.audioContext.currentTime + this.state.pausedAt / 1000) / this.state.duration * 100
        $(".playbackBar .progress").css("width",prog + "%")
    }

    manualProgress(mouse,progressBar){
        let percentage = mouse.offsetX / $(progressBar).width() * 100
        let seconds = this.state.duration * (percentage / 100)

        if( this.state.nowPlaying === true){
           // this.state.source.disconnect();
            
           // this.state.source = null;
           // clearInterval(this.state.interval)
           // this.state.nowPlaying = false;
            this.state.source.stop();       
            this.state.nowPlaying = false; 
        }
        
        console.log('Seconds = ' + seconds)
        //this.state.pausedAt = seconds*1000;

        this.state.pausedAt = seconds*1000
        
        this.play(this.state.currentSongId)

    }

    formatTime(seconds) {
        var time = Math.round(seconds)
        var minutes = Math.floor(time/60)
        var sec = time - minutes*60

        var extraZero = (sec < 10) ? "0" : ""

        return minutes + ":" + extraZero + sec
    }



    async play(id){
        //console.log(id)
        

        console.log("In play function")

        if(this.state.currentSongId !== id){

            await fetch(`http://localhost:3005/tracks/songInfo/${id}`)
            .then(res => res.json())   // return json format : actual data is always in form of string
            .then(res => {
                this.setState({
                    currentSongId : id,
                    currentSongArtist: res.metadata.artist,
                    currentSongName:res.metadata.songname 
                })
              
            })

        }
        

        if(this.state.nowPlaying && id !== this.state.nowPlayingId)
            this.stop(this.state.nowPlayingId)
        

        if(this.state.nowPlaying)
            this.stop(this.state.nowPlayingId)

        
        
        if(this.state.nowPlaying === false)
        {
            
            const getAudioContext =  () => {
                AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContent = new AudioContext();
            
                return audioContent;
            };

   
            // load audio file from server
            const response =  await axios.get(`http://localhost:3005/tracks/${id}`, {
                responseType: 'arraybuffer'
            });

            // create audio context
            this.state.audioContext = getAudioContext();

            // create audioBuffer (decode audio file)
            const audioBuffer =  await this.state.audioContext.decodeAudioData(response.data);
            
            //console.log("duration = " + audioBuffer.duration);
            //console.log(" = " + audioBuffer.duration);
            //console.log("duration = " + audioBuffer.duration);

            // create audio source
            this.state.source = this.state.audioContext.createBufferSource();
            this.state.source.buffer = audioBuffer;
            
            this.state.gainNode = this.state.audioContext.createGain()
            this.state.source.connect(this.state.gainNode)

            //this.state.source.connect(this.state.audioContext.destination);
            
            this.state.gainNode.connect(this.state.audioContext.destination);
            
            $(".controlButton.play").hide();
            $(".controlButton.pause").show();
            $(".controlButton.volume").show();
            $(".controlButton.mute").hide();

            this.state.duration = audioBuffer.duration
            var songDuration = this.formatTime(audioBuffer.duration)
            

            // play audio
            if(id === this.state.nowPlayingId)
            {
                this.state.nowPlaying = true;
                this.state.startedAt = Date.now() - this.state.pausedAt;
                this.state.source.start(0, this.state.pausedAt / 1000);
                console.log("Here " + this.state.pausedAt/1000)
            }
            else
            {
                $(".progressTime.remaining").text(songDuration)

                this.state.startedAt = Date.now()
                this.state.pausedAt = null

                this.state.nowPlaying = true;
                this.state.nowPlayingId = id;

                this.state.source.start();

            }

           // console.log(this.state.source)


/*
            this.state.source.addEventListener("timeupdate",function(){
                console.log("EventListener")
                if(audioBuffer.duration)
                {
                    $(".progressTime.current").text(this.formatTime(this.state.source.currentTime))
                    $(".progressTime.remaining").text(this.formatTime(audioBuffer.duration - this.state.source.currentTime))
                }
            })
*/

            // console.log("Ended out" + this.state)


            /* Another variable endInterval is taken because after the onended interval this.state becomes undefined if function(event) is used
                because every new function defined its own this value. There use arrow function if using ES6
                let endInterval= this.state.interval= window.setInterval(this.progress ,1000);
            */
            
           
            
            // For taking account of progress bar
            this.state.interval= window.setInterval(this.progress ,1000);
            
            // For taking account of volume bar
            this.volumeBarProgress()
            /*
            const el = document.getElementById("pb")
            el.addEventListener("click",()=>{
                console.log("VolumeEventListener")    
               // this.volumeBarProgress()
            })
            */


            this.state.source.onended = ()=> {
                console.log("Ended" + this + this.state + this.state.nowPlaying)
                
                this.state.source = null;
                this.state.nowPlaying = false;
                clearInterval(this.state.interval)
                $(".controlButton.play").show();
                $(".controlButton.pause").hide();
            }


            //let selfState = this.state
            let self = this

            


/*
            $(".playbackBar .progressBar").mousedown(function(){
                selfState.mouseDown = true;
            })

            $(".playbackBar .progressBar").mousemove(function(event){
                if(selfState.mouseDown === true)
                    self.manualProgress(event,this)
            })

            
*/          




/*
//Events getting fired up multiple times
                $(document).ready(function () {
                $(".playbackBar .progressBar").mouseup(function(event){
                    event.stopPropagation();
                    self.manualProgress(event,this)
                })
        })
           
*/

/*
            $(".playbackBar .progressBar").off('mousedown.duck').on('mousedown.duck', function(event) {
                selfState.mouseDown = true
            })

            $(".playbackBar .progressBar").off('mousemove.duck').on('mousemove.duck', function(event) {
                if(selfState.mouseDown === true)
                    self.manualProgress(event,this)
            })

            $(document).off('mouseup.duck').on('mouseup.duck', function(event) {
                selfState.mouseDown = false
            })

*/

            $(".playbackBar .progressBar").off('mouseup.duck').on('mouseup.duck', function(event) {
                self.manualProgress(event,this)
            })



            $(".volumeBar .progressBar").off('mouseup.duck').on('mouseup.duck', function(event) {
                let percentage = event.offsetX / $(this).width()
                console.log("Volume "+percentage)
                self.setVolume(percentage)
                
                //selfState.gainNode.gain.setValueAtTime(percentage, selfState.audioContext.currentTime)
            })

            


        }
       
    }


    stop(id){
        if(id === this.state.nowPlayingId && this.state.nowPlaying){
            clearInterval(this.state.interval)
            this.state.source.disconnect();
            this.state.source.stop(0);
            this.state.source = null;

            this.state.nowPlaying = false;
            this.state.pausedAt = null
            this.state.startedAt = null
            $(".controlButton.play").show();
            $(".controlButton.pause").hide();
        }
        
    }



    pause(id){
        if(id === this.state.nowPlayingId && this.state.nowPlaying){
            this.state.source.disconnect();
            this.state.source.stop(0);
            this.state.source = null;
            clearInterval(this.state.interval)
            this.state.pausedAt = Date.now() - this.state.startedAt
            this.state.nowPlaying = false;

            $(".controlButton.play").show();
            $(".controlButton.pause").hide();
            //console.log(this.state.source)
        }
    }








    // render() {
    //     return (
    //         <div id="mainContainer"> 
    //             <div id="topContainer">
    //                 <NavBar changeURL={this.changeURL} stopIt={this.stopIt} />
    //                 {this.state.currentURL === 'allSongs' && <Display arr={this.state.arr} play={this.play} pause={this.pause} stop={this.stop} currentURL={this.state.currentURL} artistSelected={this.state.artistSelected}/>}
    //                 {this.props.requestedURL === 'browse' && <Display arr={this.state.arr} artistArr={this.state.artistArr} currentURL="browse" artistBrowsed={this.artistBrowsed}/>}
    //             </div>
    //             {this.state.currentURL === 'allSongs' && <NowPlaying id={this.state.currentSongId} songName={this.state.currentSongName} artist={this.state.currentSongArtist} play={this.play} pause={this.pause} stop={this.stop} setVolume={this.setVolume}/> }      
    //         </div>
    //     )
    // }


    render(){
        if(this.state.currentURL === 'allSongs' || this.props.requestedURL === 'allSongs')
        {
            return(
                <div id="mainContainer"> 
                    <div id="topContainer">
                        <NavBar changeURL={this.changeURL} stopIt={this.stopIt} />
                        <Display arr={this.state.arr} play={this.play} pause={this.pause} stop={this.stop} currentURL="allSongs" artistSelected={this.state.artistSelected} langSelected={null}/>
                    </div>
                    <NowPlaying id={this.state.currentSongId} songName={this.state.currentSongName} artist={this.state.currentSongArtist} play={this.play} pause={this.pause} stop={this.stop} setVolume={this.setVolume} addToList={this.addToList}/>   
                </div>
            )
        }
        else if(this.state.currentURL === 'none' && this.props.requestedURL === 'browse')
        {
            return(
                <div id="mainContainer"> 
                    <div id="topContainer">
                        <NavBar changeURL={this.changeURL} stopIt={this.stopIt} />
                        <Display arr={this.state.arr} artistArr={this.state.artistArr} currentURL="browse" stopIt={this.stopIt}/>
                    </div>
                </div>
            )
        }
        else if(this.props.requestedURL === 'artist')
        {
            return(
                <div id="mainContainer"> 
                    <div id="topContainer">
                        <NavBar changeURL={this.changeURL} stopIt={this.stopIt} />
                        <Display arr={this.state.arr} play={this.play} pause={this.pause} stop={this.stop} currentURL="allSongs" artistSelected={this.props.location.state.artistSelected} langSelected={null}/>
                    </div>
                    <NowPlaying id={this.state.currentSongId} songName={this.state.currentSongName} artist={this.state.currentSongArtist} play={this.play} pause={this.pause} stop={this.stop} setVolume={this.setVolume} addToList={this.addToList}/>   
                </div>
            )
        }
        else if(this.props.requestedURL === 'language')
        {
            return(
                <div id="mainContainer"> 
                    <div id="topContainer">
                        <NavBar changeURL={this.changeURL} stopIt={this.stopIt} />
                        <Display arr={this.state.arr} play={this.play} pause={this.pause} stop={this.stop} currentURL="allSongs" artistSelected={this.state.artistSelected} langSelected={this.props.location.state.langSelected}/>
                    </div>
                    <NowPlaying id={this.state.currentSongId} songName={this.state.currentSongName} artist={this.state.currentSongArtist} play={this.play} pause={this.pause} stop={this.stop} setVolume={this.setVolume} addToList={this.addToList}/>   
                </div>
            )
        }
        else if(this.props.requestedURL === 'search')
        {
            return(
                <div id="mainContainer"> 
                    <div id="topContainer">
                        <NavBar changeURL={this.changeURL} stopIt={this.stopIt} />
                        <Display arr={this.state.arr} artistArr={this.state.artistArr} play={this.play} pause={this.pause} stop={this.stop} currentURL="search" artistSelected={this.state.artistSelected} langSelected={null} stopIt={this.stopIt}/>
                    </div>
                    <NowPlaying id={this.state.currentSongId} songName={this.state.currentSongName} artist={this.state.currentSongArtist} play={this.play} pause={this.pause} stop={this.stop} setVolume={this.setVolume} addToList={this.addToList}/>   
                </div>
            )
        }
        else if(this.props.requestedURL === 'mymusic')
        {
            return(
                <div id="mainContainer"> 
                    <div id="topContainer">
                        <NavBar changeURL={this.changeURL} stopIt={this.stopIt} />
                        <Display arr={this.props.location.state.playlist} play={this.play} pause={this.pause} stop={this.stop} currentURL="mymusic" artistSelected={null} langSelected={null} stopIt={this.stopIt}/>
                    </div>
                    <NowPlaying id={this.state.currentSongId} songName={this.state.currentSongName} artist={this.state.currentSongArtist} play={this.play} pause={this.pause} stop={this.stop} setVolume={this.setVolume} addToList={this.addToList}/>   
                </div>
            )
        }
    }




}

export default Dashboard
