import React, { PureComponent } from 'react'

export default class TopNav extends PureComponent{
  render(){
    return(
      
        <div className="topNav teal lighten-2">
          <section>
            <h5 style={{fontWeight:"bold", margin:"0px"}}>Tip 'em</h5>
            <button className="btn-small"onClick={this.props.openModal}>Help</button>
          </section>
        </div>
    
    )
  }
}