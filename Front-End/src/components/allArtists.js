import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './styledash.css'

export class AllArtists extends Component {

    render() {

        if(this.props.artistArr.length > 0)
        {
            return (
                <div className="gridViewContainer">
                    <div>
                        <h1 style={{color:"white"}}>ARTISTS</h1>
                    </div>
                    {
                        this.props.artistArr.map((s,index)=>{

                            const newTo = { 
                                pathname: "/dashboard/browse/artists", 
                                state: {
                                    artistSelected: s.filename
                                }
                                
                            };

                            return <div className="gridViewItem" key={index} > 
                                <br/>
                                <div className="gridViewItem"  style={{color:"white"}}>
                                    <Link to={newTo} onClick={()=>this.props.stopIt()}><img src={`http://localhost:3005/tracks/artist/${s._id}`}  alt={s.filename}/>
                                        <div className="gridViewInfo" >
                                            <span >{s.filename}</span> 
                                        </div>
                                    </Link>
                                    <br/>                        
                                </div>
                            </div>
                        })
                    }
                    
                </div>
            )
        }
        else
            return null
    }


}

export default AllArtists