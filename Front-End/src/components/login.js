import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import './stylelogin.css'

class Login extends Component {

    constructor(){
        super();
        this.state = {
            userId:0,
            redirectIt:false
        }
        this.login=this.login.bind(this);
    }

    login(event){
        //console.log('login');
        event.preventDefault();

         
       // console.log(event);
        let user = {
            
            username:event.target.loginUserName.value,
            password:event.target.loginPassword.value
            
        }
        fetch(`http://localhost:3005/users/login`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        })
        .then( res => {
            if(res.ok){
                //window.location.assign("/dashboard")
                this.setState({
                    redirectIt:true
                })
            }
                
            else
                alert('Wrong Username and Password')
        })
        .then()

    }


    render() {

        if(this.state.redirectIt)
            return <Redirect to='/dashboard'/>
        else
        return (
            <div>
                <div id="loginContainer">
                    <div id="inputContainer">
                    <form id="loginForm" onSubmit={this.login} method="post">
                            <h2>Login in to your account</h2>
                            <p>
                                <label htmlFor="loginUserName">Username</label>
                                <input type="text" id="loginUserName" name="loginUserName" placeholder="e.g : mohit_relaha" required maxLength="20"/>
                            </p>

                            <p>
                                <label htmlFor="loginPassword">Password</label>
                                <input type="password" id="loginPassword" name="loginPassword" placeholder="Your Password" required minLength="3" maxLength="8"/>
                            </p>

                            <div className="hasAccount">
                                <Link to="forgotpw"><span>Forgot your password?</span></Link>
                            </div>

                            <button type="submit" name="loginButton" id="loginBut">LOG IN</button>
                            
                            <div className="hasAccount">
                                <Link to="signup">Don't have an account yet? Signup here.</Link> 
                            </div>
                            

                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login
