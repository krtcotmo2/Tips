import React, { PureComponent } from 'react'
import {Link}from "react-router-dom";

export default class Itemize extends PureComponent {
  render() {
    return (
      <div>
        <h1>Itemize</h1>
        <Link to="/"><button className="btn">Home</button></Link> 
      </div>
    )
  }
}
