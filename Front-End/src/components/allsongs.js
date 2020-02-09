import React, { Component } from 'react'

export class AllSongs extends Component {


    render() {


        let arr = this.props.arr

        if(this.props.artistSelected !== null)
        {    
            arr = arr.filter((song)=>{
                console.log(song.metadata.artist)
                return this.props.artistSelected === song.metadata.artist
            })
        }
        else if(this.props.langSelected !== null)
        {    
            arr = arr.filter((song)=>{
                console.log(song.metadata.artist)
                return this.props.langSelected === song.metadata.language
            })
        }
        

                        
        return (
            
            <div className="gridViewContainer">
                
                    {   
                        arr.map((s,index)=>{
                        return <div className="gridViewItem" key={index} > 
                            <br/>
                            <div className="gridViewItem"  style={{color:"white"}}>
                                <img src={`http://localhost:3005/tracks/images/${s._id}`} onClick={()=>this.props.play(s._id)} alt={s.filename}/>
                                
                                <div className="gridViewInfo" >
                                    <span onClick={()=>this.props.play(s._id)}>{s.filename}</span> <br/>
                                    <button onClick={()=>this.props.play(s._id)} style={{backgroundColor:"green"}}>Play </button>
                                    <button onClick={()=>this.props.pause(s._id)} style={{backgroundColor:"blue"}}>Pause </button>
                                    <button onClick={()=>this.props.stop(s._id)} style={{backgroundColor:"red"}}>Stop</button>
                                </div>
                            </div>
                            
                                
                        </div>
                        })
                    }
                
            </div>
        )
    }
}

export default AllSongs

