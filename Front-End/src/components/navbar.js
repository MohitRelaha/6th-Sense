import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './styledash.css'
import logo from '../images/logo.png'
import search from '../images/search.png'
import {Redirect} from 'react-router-dom'


class Navbar extends Component {
    
    constructor(){
        super()
        this.state = {
            redirectIt : false,
            user:{}
            // ,myMusic:{ 
            //     pathname: "/dashboard/mymusic", 
            //     state: {
            //         playlist: []
            //     }
                
            // }
        }
        this.logout = this.logout.bind(this)
        // this.reRequest = this.reRequest.bind(this)
    }
    
    componentDidMount(){
        fetch('http://localhost:3005/users/profile')
        .then(res=>res.json())
        .then(res=>{
                this.setState({
                    user:res
                    // ,myMusic:{ 
                    //     pathname: "/dashboard/mymusic", 
                    //     state: {
                    //         playlist: res.playlist
                    //     }
                        
                    // }
                })
        })
        .catch(err=>{
            console.log("Error fetching user profile  " + err)
        })
    }

    // reRequest(){
    //     this.props.stopIt()
    //     fetch('http://localhost:3005/users/profile')
    //     .then(res=>res.json())
    //     .then(res=>{
                
    //             setTimeout(function(){ this.setState({
    //                 user:res,
    //                 myMusic:{ 
    //                     pathname: "/dashboard/mymusic", 
    //                     state: {
    //                         playlist: res.playlist
    //                     }
                        
    //                 }
    //             }) }, 2000)
    //     })
    //     .catch(err=>{
    //         console.log("Error fetching user profile  " + err)
    //     })
    // }

    logout(){
        fetch('http://localhost:3005/users/logout')
        .then(res=>{
            if(res.ok){
                this.props.stopIt()
                alert("Logout Successfull")
                this.setState({
                    redirectIt:true
                })
            }
        })
    }
 
    render() {

        const newTo = { 
            pathname: "/profile", 
            state: {
                user: this.state.user
            }
            
        };

        const myMusic = { 
            pathname: "/dashboard/mymusic", 
            state: {
                playlist: this.state.user.playlist
            }
            
        };

        if(this.state.redirectIt){
            return <Redirect to='/' />
        }
        else {
            return (
                    
                    <div id="navBarContainer">
                        <nav className="navBar">
                            
                            <Link to="/" onClick={()=>this.props.stopIt()} ><img src={logo} alt="logo"/></Link>
                            
                            <div className="group">
                                
                                <div className="navItem">
                                    <Link to="/dashboard/search" className="navItemLink" onClick={()=>this.props.stopIt()} >Search
                                        <img src={search} alt="search" className="icon"/>
                                    </Link>
                                </div>
                                
                            </div>
                            
                            
                            <div className="group">
                                
                                <div className="navItem">
                                {/* <span className="navItemLink" onClick={()=>this.props.changeURL()}>Browse</span> */}
                                    <Link to="/dashboard/browse"><span onClick={()=>this.props.stopIt()} className="navItemLink">Browse</span></Link>
                                </div>
                            
                                <div className="navItem">
                                    <Link to="/dashboard/addSongs" ><span onClick={()=>this.props.stopIt()} className="navItemLink">Add Songs</span></Link>
                                </div>

                                <div className="navItem">
                                    <Link to="/dashboard/addArtist" ><span onClick={()=>this.props.stopIt()} className="navItemLink">Add Artist</span></Link>
                                </div>

                                <div className="navItem">
                                    <span onClick={()=>this.logout()} className="navItemLink">Logout</span>
                                </div>

                                <div className="navItem">
                                    <Link to={newTo} ><span className="navItemLink" onClick={()=>this.props.stopIt()}>Hi, {this.state.user.username}</span></Link>
                                </div>

                                <div className="navItem">
                                    <Link to={myMusic} ><span onClick={()=>this.props.stopIt()} className="navItemLink" >My Music</span></Link>
                                </div>
                                
                            
                            </div>
                            
                            
                        </nav>
                    </div>
                
            )
        }
    }
}

export default Navbar
