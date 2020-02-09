import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './stylehome.css'
import img from './imgused' 

class Home extends Component {
    render(){
        return(
            <div>
                <div className="homeContainer">
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
                    
                    </div>
                    
                    
                    <div className="containerBody">
                        <h1>Music for everyone.</h1>
                        <h2>Millions of songs. No credit card needed.</h2>
                        <Link to="/login"><button className="getStarted">GET STARTED</button></Link>
                    </div>

                </div>
                
                <div className="contactinfo">
                    <div className="contactinfo1">
                        <li className="footerLeftSide"><img src={img.img2[0]}/></li>
                        <li className="footerLeftSide"><h3>6thSENSE</h3></li>

                    </div>
                    
                    <div className="contactinfo2">
                        <ul id="ulHome">
                            <li className="heading">COMPANY</li>
                            <li className="heading">
                                <div class="links">
                                    <Link to="/about">About</Link>
                                </div>
                            </li>

                            <li className="heading">
                                <div class="links">
                                    <Link to='/noService'>Jobs</Link>
                                </div>
                            </li>

                            <li className="heading">
                                <div class="links">
                                    <Link to='/noService'>For the Record</Link>
                                </div>
                            </li>
                        </ul>
                        
                    </div>
                    
                    <div className="contactinfo3">
                        <ul id="ulHome">
                            <li className="heading">COMMUNITIES</li>
                            <li className="heading">
                                <div class="links">
                                    <Link to='/noService'>For Artist</Link>
                                </div>
                            </li>

                            <li className="heading">
                                <div class="links">
                                    <Link to='/noService'>Developers</Link>
                                </div>
                            </li>

                            <li className="heading">
                                <div class="links">
                                    <Link to='/noService'>Brands</Link>
                                </div>
                            </li>

                        </ul>
                        
                    </div>
                    
                    <div className="contactinfo4">
                        <ul id="ulHome">
                            <li className="heading">USEFUL LINKS</li>
                            <li className="heading">
                                <div class="links">
                                    <Link to='/noService'>Help</Link>
                                </div>
                            </li>

                            <li className="heading">
                                <div class="links">
                                    <Link to='/noService'>Web Player</Link>
                                </div>
                            </li>

                            <li className="heading">
                                <div class="links">
                                    <Link to='/noService'>Free Web App</Link>
                                </div>
                            </li>

                        </ul>
                        
                    </div>
                    
                    <div className="contactinfo5">
                        <ul id="ulHome">
                            <li><img src={img.img2[1]} className="sociallogo"/></li>
                            <li><img src={img.img2[2]} id="logo2" className="sociallogo" alt="image not found"/></li>
                            <li><img src={img.img2[3]} id="logo3" className="sociallogo"/></li>
                        </ul>
                        
                    </div>
                </div>
                
                        
            </div>

        )
    }
}

export default Home