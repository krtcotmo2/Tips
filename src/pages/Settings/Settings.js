import React, { PureComponent } from 'react'
import { Switch, TextInput } from 'react-materialize';
import {Link}from "react-router-dom";
import Slider from 'react-rangeslider'

export default class Even extends PureComponent {
  constructor (props, context) {
    super(props, context)
    this.state = {
      defaultTax: true,
      defaultTipPercent:15,
      defaultPartyMemebrs:3
    }
  };
  componentDidMount = () => {
    console.log(localStorage.getItem("defaultTax"))
    this.setState({
      defaultTax: localStorage.getItem("defaultTax") === 'false' ? false: true,
      defaultTipPercent: localStorage.getItem("defaultTipPercent") || 15,
      defaultPartyMemebrs: localStorage.getItem("defaultPartyMemebrs") || 3,
    });
  };
  changeTax = event =>{
    localStorage.setItem("defaultTax", event.target.checked);
    this.setState({
      defaultTax: (event.target.checked),
    });    
  }
  handleTipChange = value => {
    localStorage.setItem("defaultTipPercent", value);
    this.setState({
      defaultTipPercent: value
    })    
  };
  handlePeopleChange = value => {
    localStorage.setItem("defaultPartyMemebrs", value);
    this.setState({
      defaultPartyMemebrs: value
    })    
  };
  render() {
    const { defaultPartyMemebrs, defaultTipPercent, defaultTax } = this.state;
    const horizontalLabels = {
      5: '5',
      15: '15',
      25: '25',
    }
    
    return(
    <section className="mainHolder container">
      <h3>Default Settings</h3>
      <div className="col s6">
      <span style={{width:'80%', margin:'0 auto', display:'block', textAlign:'left'}}>By default do you want to include the tax as part of the tippable amount?</span>
          <Switch offLabel="No" onLabel="Yes" checked={defaultTax} onChange={this.changeTax} />  
          </div>
      <div id="tipslider" className="row">
      <span style={{width:'80%', margin:'0 auto', display:'block', textAlign:'left'}}>By default what is the tip percentage you want to use?</span>
          <Slider name="defaultTipPercent" min={0} max={30} value={defaultTipPercent} handleLabel={defaultTipPercent.toString()} labels={horizontalLabels} onChange={this.handleTipChange} />
        </div>
      <div id="peopleslider" className="row" >
      <span style={{width:'80%', margin:'0 auto', display:'block', textAlign:'left'}}>By default how many people do you want to have the Even Steven mode display?</span>
        <Slider name="defaultPartyMemebrs" min={2} max={12} value={defaultPartyMemebrs} handleLabel={defaultPartyMemebrs.toString()} onChange={this.handlePeopleChange}/>
      </div>
     <p>
        <Link to="/"><button className="btn">Home</button></Link>
      </p> 
    </section>
    )
  }
}