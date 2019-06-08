import React, { PureComponent } from 'react'
import { Switch, Range, TextInput } from 'react-materialize';
import {Link}from "react-router-dom";
import Slider from 'react-rangeslider'

export default class Even extends PureComponent {
  constructor (props, context) {
    super(props, context)
    this.state = {
      horizontal: 10,
      vertical: 50
    }
  }
 
  render() {  
    const { horizontal, vertical } = this.state
    const horizontalLabels = {
      0: 'Low',
      50: 'Medium',
      100: 'High'
    }
  
    const verticalLabels = {
      10: 'Getting started',
      50: 'Half way',
      90: 'Almost done',
      100: 'Complete!'
    }  
    return (
      <section className="mainHolder container">
        <h3>Even Steven</h3>
        <span>Number in Party</span>
        <Slider
          min={2}
          max={20}
          value={horizontal}

          
         />
        <span style={{width:'50%', display:'inline-block'}}>Include Taxes</span><Switch offLabel="No" onLabel="Yes"/>        
        <span>Total Bill</span>
        <TextInput type="number"/>
        <span>Tax Amount</span>
        <TextInput type="number"/>
        <span>Tip Percent</span>
        <Range min="2" max="20" name="points" />
      
        <span>Amount Per Person</span>
        <TextInput type="number" disabled />
        <Link to="/"><button className="btn">Home</button></Link> 
      </section>
    )
  }
}
