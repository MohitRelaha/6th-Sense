import React, { Component } from 'react'
import './styledash.css'

class AddSongs extends Component {

    render() {
        return (
            <div class="form-container">
                <div class="form-body">
                    <form action="http://localhost:3005/tracks" enctype="multipart/form-data" method="post">
                        <label for="name">Songname</label>
                        <input type="text" id="name" name="name" required/>
                        <br/><br/>

                        <label for="name">Artist</label>
                        <input type="text" id="artist" name="artist" required/>
                        <br/><br/>

                        <label for="name">Album</label>
                        <input type="text" id="album" name="album" required/>
                        <br/><br/>

                        <label for="name">Genre</label>
                        <input type="text" id="genre" name="genre" required/>
                        <br/><br/>

                        <label for="name">Language</label>
                        <input type="text" id="language" name="language" required/>
                        <br/><br/>

                        <label for="track">Upload Song</label>
                        <input type="file" id="track" name="track" required/>
                        <br/><br/>

                        <label for="track">Image</label>
                        <input type="file" id="image" name="image" required/>
                        <br/><br/>

                        <input class="upload-button" type="submit" value="Upload" />
                    </form>  
                </div>
            </div>
        )
    }
}

export default AddSongs