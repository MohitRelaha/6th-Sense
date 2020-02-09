import React, { Component } from 'react'
//import {StripeProvider} from 'react-stripe-elements';
import StripeCheckout from 'react-stripe-checkout';
import './styledash.css'
require('dotenv').config()

class Premium extends Component {
    constructor(){
        super();
        this.state={
            cost:0
        }
        this.handleToken=this.handleToken.bind(this);
    }
    setCost(event)
    {
        this.setState({
             cost:event.target.value
        })
    }
    handleToken(token)
    {
        alert('Subscribed successfully');
    }
    render() {
        return (
            <div class="form-container">
                <div class="form-body">
                    
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" /><br/>
                        <label for="cost">Choose your subscription plan below</label><br/>
                        <div className="radioBut" onChange={this.setCost.bind(this)}>
                        <input type="radio" name="cost" value="500"/>3 Months<br/>
                        <input type="radio" name="cost" value="700"/>6 Months<br/>
                        <input type="radio" name="cost" value="999"/>12 Months<br/>
                        
                        </div>
                        
                        <h1><span id="totalCost">INR    {this.state.cost}</span></h1>
                        <div>
                        
                        </div>
                    <div className="checkoutBut">
                        <StripeCheckout stripeKey={process.env.REACT_APP_API_KEY} token={this.handleToken} 
                                amount={this.state.cost*100}
                                currency='inr' 
                                name='6th Sense'
                                description= 'Make Your Payment'
                                label= 'Buy Subscription' />
                    </div>
                </div>
            </div>
        )
    }
}

export default Premium;
