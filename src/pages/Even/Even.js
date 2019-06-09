import React, { PureComponent } from 'react'
import { Switch, Range, TextInput } from 'react-materialize';
import {Link}from "react-router-dom";
import Slider from 'react-rangeslider'

export default class Even extends PureComponent {
  constructor (props, context) {
    super(props, context)
    this.state = {
      numPeople: 3,
      tipPercent: 15,
      personAmount:0,
      totalBill:0,
      taxAmount:0,
      includeTax:true
    }
  }
  handleTipChange = value => {
    this.setState({
      tipPercent: value,
      personAmount: this.calculatePerPerson(),
    })
    
  };
  handlePeopleChange = value => {
    this.setState({
      numPeople: value,
      personAmount: this.calculatePerPerson(),
    })
  };
  updateBill = event =>{    
    const { name, value } = event.target;
    this.setState({ [name]: parseFloat(value) });

    let _this = this;
    let _cb = this.calculatePerPerson
    setTimeout(
      function(){ 
        _this.setState({
          personAmount: _cb(),
        }); 
    }, 5);


  }
  changeTax = event =>{
    this.setState({
      includeTax: (event.target.checked),
    });
    let _this = this;
    let _cb = this.calculatePerPerson
    setTimeout(
      function(){ 
        _this.setState({
          personAmount: _cb(),
        }); 
    }, 5);
  }

  calculatePerPerson = () => {
    console.log(this.state)
    let tippableAmount = this.state.includeTax ? this.state.totalBill : this.state.totalBill - this.state.taxAmount;
    let totalTip = tippableAmount * (this.state.tipPercent/100);
    let personTip = totalTip / this.state.numPeople;    
    return this.state.includeTax ? personTip + (this.state.totalBill/this.state.numPeople) : personTip + ((this.state.totalBill - this.state.taxAmount) / this.state.numPeople) +( this.state.taxAmount /  this.state.numPeople);
  }

  render() {  
    const { numPeople, tipPercent, personAmount, totalBill, includeTax, taxAmount } = this.state;
    const horizontalLabels = {
      5: '5',
      15: '15',
      25: '25',
    }
  
    return (
      <section className="mainHolder container">
        <h3>Even Steven</h3>
        <span>Number in Party</span>
        <div id="peopleslider">
          <Slider name="people" min={2} max={12} value={numPeople} handleLabel={numPeople.toString()}  onChange={this.handlePeopleChange}/>
        </div>             
        <span>Total Bill</span>
        <TextInput type="number"  name="totalBill" value={totalBill} onChange={this.updateBill} />
        <span>Tax Amount</span>
        <TextInput type="number" name="taxAmount" value={taxAmount} onChange={this.updateBill}  />
        <span style={{width:'50%', display:'inline-block'}}>Include Taxes</span>
        <Switch offLabel="No" onLabel="Yes" checked={includeTax} onChange={this.changeTax}/>  
        <span>Tip Percent</span>
        <div id="tipslider">
          <Slider name="tipPercent" min={0} max={30} value={tipPercent} handleLabel={tipPercent.toString()} onChange={this.handleTipChange}  labels={horizontalLabels} />
        </div>
        <span>Amount Per Person</span>
        <TextInput disabled value={personAmount.toFixed(2)} />
        <Link to="/"><button className="btn btnHome">Home</button></Link> 
      </section>
    )
  }
}
