import React,{Component} from 'react';
import './stylehome.css';
import {Link} from 'react-router-dom';
import img from './imgused' 

class NoService extends Component{
    render(){
        return (
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
                                <Link to="/help">Help</Link>
                            </div>
                            </li>

                            <li className="rightSide">
                            <div class="links">
                                <Link to="/premium">Premium</Link>
                            </div>
                            </li>


                        </ul>
                    
                    </div>
                    <div class="noServeMsg">
                        <h1>Server under Development</h1>
                        <p>Sorry for Inconvinience</p>
                        <p>Please Try again later</p>
                    </div>


                </div>
            </div>
        )
    }
}
export default NoService;