import React, { Component } from 'react'
import './styledash.css'

class Profile extends Component {

    render() {
        
        return (
            <div class="form-container">
                <div class="form-body">
                <form>
                    <label for="name">User Name</label>
                    <input type="text" id="username" name="username" style={{color:"black"}} value={this.props.location.state.user.username} disabled/>
                    <br/><br/>

                    <label for="firstname" >First Name</label>
                    <input type="text" id="firstname" name="firstname" style={{color:"black"}} value={this.props.location.state.user.firstname} disabled/>
                    <br/><br/>

                    <label for="lastname" >Last Name</label>
                    <input type="text" id="lastname" name="lastname" style={{color:"black"}} value={this.props.location.state.user.lastname} disabled/>
                    <br/><br/>

                    <label for="email" >Email</label>
                    <input type="text" id="email" name="email" style={{color:"black"}} value={this.props.location.state.user.email} disabled/>
                    <br/><br/>

                    <label for="gender" >Gender</label>
                    <input type="text" id="gender" name="gender" style={{color:"black"}} value={this.props.location.state.user.gender} disabled/>
                    <br/><br/>

                </form>  
            </div>
            </div>
        )
    }
}

export default Profile