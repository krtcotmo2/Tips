import React, { PureComponent } from 'react'
import "./topnav.css";
export default class TopNav extends PureComponent{
  render(){
    return(
      
        <div className="topNav">
          <section>
            <img src="/images/tipLogo.png"/>
            <button className="btn-small"onClick={this.props.openModal}>Help</button>
          </section>
        </div>
    
    )
  }
}