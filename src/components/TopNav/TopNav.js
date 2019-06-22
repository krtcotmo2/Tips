import React, { PureComponent } from 'react'
import {Link} from "react-router-dom";
import "./topnav.css";
export default class TopNav extends PureComponent{
  render(){
    return(
      
        <div className="topNav">
          <section>
            <Link to="/"><img src="/images/tipLogo.png" title='Home'/></Link>
            <button className="btn-small"onClick={this.props.openModal}>Help</button>
          </section>
        </div>
    
    )
  }
}