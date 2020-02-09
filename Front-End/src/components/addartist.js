import React, { Component } from 'react'
import './styledash.css'

class AddArtist extends Component {

    render() {
        
        return (
            <div class="form-container">
                <div class="form-body">
                <form action="http://localhost:3005/tracks/addArtist" enctype="multipart/form-data" method="post">
                    <label for="name" >Artist Name</label>
                    <input type="text" id="name" name="name" style={{color:"black"}} />
                    <br/><br/>

                    <label for="track" >Image</label>
                    <input type="file" id="image" name="image" style={{color:"black"}} />
                    <br/><br/>

                    <input type="submit" value="Upload" style={{color:"black"}} />
                </form>  
            </div>
            </div>
        )
    }
}

export default AddArtist