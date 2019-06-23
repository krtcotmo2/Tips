import React, { PureComponent } from 'react'
import { Switch, TextInput } from 'react-materialize';
import {Link}from "react-router-dom";
import Slider from 'react-rangeslider'

//set up state for component
export default class Even extends PureComponent {
  constructor (props, context) {
    super(props, context)
    this.state = {
      defaultTax: true,
      defaultTipPercent:15,
      defaultPartyMemebrs:3
    }
  };
  //gets the numer of people in party, include taxes and tip percent from the local storage or sets default values if local storage is empty
  componentDidMount = () => {
    this.setState({
      defaultTax: localStorage.getItem("defaultTax") === 'false' ? false: true,
      defaultTipPercent: localStorage.getItem("defaultTipPercent") || 15,
      defaultPartyMemebrs: localStorage.getItem("defaultPartyMemebrs") || 3,
    });
  };

  //change event for the include taxes settings - saves state and local storage
  changeTax = event =>{
    localStorage.setItem("defaultTax", event.target.checked);
    this.setState({
      defaultTax: (event.target.checked),
    });    
  }
   //event for tip slider, sets the tip percent in the state with the value of the slider - saves state and local storage
   handleTipChange = value => {
    localStorage.setItem("defaultTipPercent", value);
    this.setState({
      defaultTipPercent: value
    })    
  };
  //event for number of people slider, sets the number of people in the state with the value of the slider - saves state and local storage
  handlePeopleChange = value => {
    localStorage.setItem("defaultPartyMemebrs", value);
    this.setState({
      defaultPartyMemebrs: value
    })    
  };
  render() {
    //extracts values from the state
    const { defaultPartyMemebrs, defaultTipPercent, defaultTax } = this.state;
    //default labels for the tip percent slider component
    const horizontalLabels = {
      5: '5',
      15: '15',
      25: '25',
    }
    
    return(
    <section className="mainHolder container">
      <h3>Default Settings</h3>
      
      {/* Taxes Switch */}
      <div className="col s6">
        <span style={{width:'80%', margin:'0 auto', display:'block', textAlign:'left'}}>By default do you want to include the tax as part of the tippable amount?</span>
        <Switch offLabel="No" onLabel="Yes" checked={defaultTax} onChange={this.changeTax} />  
      </div>

      {/* Tip percent Slider */}
      <div id="tipslider" className="row">
        <span style={{width:'80%', margin:'0 auto', display:'block', textAlign:'left'}}>By default what is the tip percentage you want to use?</span>
        <Slider name="defaultTipPercent" min={0} max={30} value={defaultTipPercent} handleLabel={defaultTipPercent.toString()} labels={horizontalLabels} onChange={this.handleTipChange} />
      </div>

      {/* Numer of People Slider */}
      <div id="peopleslider" className="row" >
        <span style={{width:'80%', margin:'0 auto', display:'block', textAlign:'left'}}>By default how many people do you want to have the Even Steven mode display?</span>
        <Slider name="defaultPartyMemebrs" min={2} max={12} value={defaultPartyMemebrs} handleLabel={defaultPartyMemebrs.toString()} onChange={this.handlePeopleChange}/>
      </div>
      
      {/* Home Button */}
      <p>
        <Link to="/"><button className="btn">Home</button></Link>
      </p> 
    </section>
    )
  }
}