import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Punjabi from '../images/punjabi.JPG'
import English from '../images/english.JPG'
import Hindi from '../images/hindi.JPG'
import './styledash.css'

const langArray = [{url:Punjabi,lang:"Punjabi"},{url:English,lang:"English"},{url:Hindi,lang:"Hindi"}]

class Language extends Component {


    render() {
        
        return (
            <div className="gridViewContainer">
                <div>
                    <h1 style={{color:"white"}}>LANGUAGES</h1>
                </div>
                {
                    langArray.map((s,index)=>{

                        const newTo = { 
                            pathname: "/dashboard/browse/language", 
                            state: {
                                langSelected: s.lang
                            }
                             
                        };

                        return <div className="gridViewItem" key={index} > 
                            <br/>
                            <div className="gridViewItem"  style={{color:"white"}}>
                                <Link to={newTo}><img src={s.url}  alt={s.lang}/></Link>
                            </div>
                        </div>
                    })
                }
                
            </div>
        )
    }


}

export default Language