import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/logo.png'
import './styleforgotpw.css'


class Forgotpw extends Component {
    render() {
        return (
            <div>
                <div id="forgotPwHeader">
                    <ul>
                        <li class="headerLeft"><Link to="/"><img src={logo} alt="logo"/></Link></li>
                        <li class="headerLeft"><h3>6thSENSE</h3></li>
                    </ul>
                </div>
        
                <div id="forgotPwMiddle">
                    <fieldset class="field_set">
                        <legend><h3>PASSWORD  RESET</h3></legend>
                        <div>
                        <p id="pFP">Enter your <b id="pFP">email address</b> that you used to register. We'll send you an email with your username and a link to reset your password.</p>
                        </div>
                
                
                        <div id="inputContainerFP">
                            <form id="forgotPwForm" action="" method="post">

                                <p id="pFP">
                                    <label for="emailFP">Email</label>
                                    <input type="email" id="emailFP" name="emailFP" placeholder="eg: mohit_relaha@gmail.com" style={{color:"black"}} required/>
                                </p>
                                <button type="submit" name="changePwButton" id="changePwBut">SEND</button>

                            </form>
                        </div>
                    </fieldset>
                </div>
            </div>
        )
    }
}

export default Forgotpw
