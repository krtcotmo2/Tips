import React, { PureComponent } from 'react'
import { Switch, Range, TextInput } from 'react-materialize';
import {Link}from "react-router-dom";

export default class Even extends PureComponent {
  render() {
    return (
      <section className="mainHolder container">
        <h1>Even Steven</h1>
        <span>Number in Party</span>
        <Range min="2" max="20" name="points" />
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
