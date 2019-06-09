import React, { PureComponent } from 'react'
import {Link}from "react-router-dom";

export default class Itemize extends PureComponent {
  render() {
    return (
      <section className="mainHolder container">
        <h3>Itemize</h3>
        <Link to="/"><button className="btn">Home</button></Link> 
      </section>
    )
  }
}
