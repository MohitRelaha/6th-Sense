import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './stylehome.css'
import img from './imgused' 

class About extends Component {
    render(){
        return(
            <div class="about-section1">
                <div className="aboutContainer">
                <div className="header" id="sticky">
                        <ul id="ulHome">
                            <li className="leftSide" ><img src={img.img2[0]}/></li>
                            <li className="leftSide"><h3>6thSENSE</h3></li>
                            <li className="rightSide">
                            <div className="links">
                                <Link to="/login">Login</Link>
                            </div>
                            </li>
                            
                            <li className="rightSide">
                            <div class="links">
                                <Link to="/signup">Signup</Link>
                            </div>
                            </li>

                            <li className="rightSide links" style={{marginTop: 6}}> 
                            |
                            </li>

                            <li className="rightSide">
                            <div class="links">
                                <Link to='/noService'>Help</Link>
                            </div>
                            </li>

                            <li className="rightSide">
                            <div class="links">
                                <Link to="/premium">Premium</Link>
                            </div>
                            </li>


                        </ul>
                    
                    </div>>
                    <div class="knowmore">
                        <h1 style={{color:"black",fontFamily: "Brush Script MT, Brush Script Std, cursive"}}>Know about our agency...</h1>
                            <p style={{color:"black",fontFamily: "Brush Script MT, Brush Script Std, cursive"}}> With 6th Sense, it’s easy to find the right music for every moment – on your phone, your computer, your tablet and more.<br/>

                            There are millions of tracks on 6th Sense. So whether you’re behind the wheel, working out, partying or relaxing, the right music or podcast is always at your fingertips. Choose what you want to listen to, or let 6th Sense surprise you.<br/>

                            You can also browse through the collections of artists and songs and just sit back.<br/>

                            Soundtrack your life with 6th Sense. Subscribe or listen for free.
                        </p>
                     </div>
                    </div>

                </div>

        )}
    }
    export default About;