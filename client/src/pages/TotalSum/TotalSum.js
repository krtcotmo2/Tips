import React, { PureComponent } from 'react'
import { Range, TextInput } from 'react-materialize';
import {Link} from "react-router-dom";

export default class TotalSum extends PureComponent {
  render() {
    return (
      <section className="mainHolder container">
        <h3>Total Sum</h3>
        <span>Total Bill</span>
        <TextInput type="number"/>
        <span>Tax Amount</span>
        <TextInput type="number"/>
        <span>Tip Percent</span>
        <Range min="2" max="20" name="points" />
      
        <span>Amount with Tip</span>
        <TextInput type="number" disabled />
        <Link to="/"><button className="btn">Home</button></Link>
      </section>
    )
  }
}
