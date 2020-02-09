import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import './stylelogin.css'

class Signup extends Component {

    constructor(){
        super();
        this.state = {
            ridirectIt:false
        }
        this.signUp=this.signUp.bind(this);
    }
    signUp(event){
        //console.log('signin');
        event.preventDefault();
        
        console.log(event);
        let user = {
            username:event.target.username.value,
            firstname:event.target.firstname.value,
            lastname:event.target.lastname.value,
            email:event.target.email.value,
            password:event.target.password.value,
            passwordConf:event.target.password2.value,
            gender:event.target.gender.value
        }

        if(user.password !== user.passwordConf){
            alert("Your Password did not match")
        }
        else{
            fetch(`http://localhost:3005/users/signup`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
            })
            .then( res => {
                if(res.ok){
                    console.log('hello');
                    return res.json();}
                else{
                    alert("User with username of email already exists")
                }
            })
            .then(res =>{
                alert('user added successfully');
                this.setState({
                    ridirectIt:true
                })
            })
        }


    }


    render() {
        if(this.state.ridirectIt){
            return <Redirect to='/login'/>
        }
        else
        {     
            return (  
                    <div> 
                        <div id="loginContainer">
                            <div id="inputContainer">
                                <form id="registerForm" onSubmit={this.signUp} method="post">
                                        <h2>Sign up for free</h2>
                                        <p>
                                            <label for="username">Username</label>
                                            <input type="text" id="username" name="username" placeholder="What should we call you?" required maxLength="20" />
                                        </p>

                                        <p>
                                            <label for="firstname">First Name</label>
                                            <input type="text" id="firstname" name="firstname" placeholder="eg : Mohit" required maxLength="10"/>
                                        </p>

                                        <p>
                                            <label for="lastname">Last Name</label>
                                            <input type="text" id="lastname" name="lastname" placeholder="eg : Relaha" required maxLength="10"/>
                                        </p>

                                        <p>
                                            <label for="email">Email</label>
                                            <input type="email" id="email" name="email" placeholder="eg: mohit_relaha@gmail.com" required maxLength="50"/>
                                        </p>

                                        <p>
                                            <label for="password">Password</label>
                                            <input type="password" id="password" name="password" placeholder="Your Password" required minLength="3" maxLength="8"/>
                                        </p>

                                        <p>
                                            <label for="password2">Confirm Password</label>
                                            <input type="password" id="password2" name="password2" placeholder="Your Password" required minLength="3" maxLength="8" />
                                        </p>


                                        <p>
                                            <input type="radio" id="gender" name="gender" value="male"  required />Male
                                            <input type="radio" id="gender" name="gender" value="female" required />Female
                                            <input type="radio" id="gender" name="gender" value="nonBinary" required />Non-Binary
                                        </p>

                                        <button type="submit" name="loginButton" id="signupBut">SIGN UP</button>
                                        
                                        <div class="hasAccount">
                                        <Link to="/login">Already have an account? Login here.</Link>
                                        </div>

                                    </form>
                            </div>
                        </div>
                    </div>
                )
        }
    }
}

export default Signup
