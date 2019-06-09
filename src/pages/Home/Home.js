import React, { PureComponent } from 'react';
import {Link}from "react-router-dom";
import "./Home.css"


export default class Home extends PureComponent {
  render() {
    return (
        <section className="mainHolder container">
          <Link to="/TotalSum">
            <button className="section sec1">Total Sum</button>
          </Link>          
          <div className="or">OR</div>
          <Link to="/Even">
            <button className="section sec2">Even Steven</button>
          </Link>          
          <div className="or">OR</div>
          <Link to="/Itemize">
            <button className="section sec3">Itemize</button>
          </Link>
        </section>
      
    )
  }
}
