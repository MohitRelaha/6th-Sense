import React, { Component } from 'react'
import './styledash.css'
import img from './imgused' 

export class NowPlaying extends Component {
    render() {
        return (
            <div id="nowPlayingContainer">
                <div id="nowPlayingBar">

                    <div id="nowPlayingLeft">

                        <div className="content">

                            <span className="albumLink">
                                <img src={`http://localhost:3005/tracks/images/${this.props.id}`} className="albumArtwork"/>
                            </span>



                            <div className="trackInfo">

                                <span className="trackName">
                                    <span>{this.props.songName}</span>
                                </span>

                                <span className="artistName">
                                    <span>{this.props.artist}</span>
                                </span>    
                            </div>

                        </div>
                    </div>


                    <div id="nowPlayingMiddle">
                        <div className="content playerControls">
                            <div className="buttons">

                                    {/* <button className="controlButton shuffle" title="Shuffle" >
                                        <img src={img.img[1]} alt="Shuffle"/>
                                    </button> */}

                                    <button className="controlButton repeat" title="Repeat" >
                                        <img src={img.img[6]} alt="Repeat"/>
                                    </button>

                                    <button className="controlButton previous" title="Previous" >
                                        <img src={img.img[2]} alt="Previous"/>
                                    </button>

                                    <button className="controlButton play" title="Play" onClick={()=>this.props.play(this.props.id)}>
                                        <img src={img.img[3]} alt="Play"/>
                                    </button>

                                    <button className="controlButton pause" title="Pause" style={{display: 'none'}} onClick={()=>this.props.pause(this.props.id)}>
                                        <img src={img.img[4]} alt="Pause"/>
                                    </button>

                                    <button className="controlButton next" title="Next" >
                                        <img src={img.img[5]} alt="Next"/>
                                    </button>

                                    <button className="controlButton stop" title="Stop">
                                        <img src={img.img[9]} alt="Stop" onClick={()=>this.props.stop(this.props.id)}/>
                                    </button>

                                    <button className="controlButton add" title="Add to Playlist">
                                        <img src={img.img[10]} alt="Add" onClick={()=>this.props.addToList(this.props.id,this.props.songName)}/>
                                    </button>
                            </div>


                            <div className="playbackBar">
                                <span className="progressTime current">0.00</span>
                                <div className="progressBar">
                                    <div className="progressBarBg">
                                        <div className="progress"></div>
                                    </div>
                                </div>
                                <span className="progressTime remaining">0.00</span>
                            </div>


                        </div>
                    </div>




                    <div id="nowPlayingRight">
                        <div className="volumeBar">

                            <button className="controlButton volume" title="Volume" onClick={()=>this.props.setVolume(0)}>
                                <img src={img.img[7]} alt="Volume"/>
                            </button>

                            <button className="controlButton mute" title="Mute" style={{display: 'none'}} onClick={()=>this.props.setVolume(1)}>
                                <img src={img.img[8]} alt="Mute" />
                            </button>

                            <div className="progressBar" id="pb">
                                <div className="progressBarBg">
                                    <div className="progress"></div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        )
    }
}

export default NowPlaying