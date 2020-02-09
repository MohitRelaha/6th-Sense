import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './stylehome.css'
import img from './imgused' 

class Help extends Component {
    render(){
        return(
                <div className="helpContainer">
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

                    <div className="helpMain">
                        <div id="grad" class="helpBody">
                
                            <span class="helpLine"><p>Need Help? Don't worry let us know!</p></span>
                            <br/>
                            <div class="helpSearch">
                                <input type="text" class="form-control" placeholder="Search here"/>
                            </div>

                        </div>
            
                        <div class="helpInfo">
                            <p>
                                For more information:<br/>
                                Contact us on<br/>
                                Phone :00000-00000<br/>
                                Or leave your doubts on <br/><b style={{color:"black"}}>support_6thsense@gmail.com</b>
                            </p>
                        </div>
                    </div>
          
                </div>

       )
    }
}

export default Help