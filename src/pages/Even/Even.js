import React, { PureComponent } from 'react'
import { Switch, TextInput } from 'react-materialize';
import {Link}from "react-router-dom";
import Slider from 'react-rangeslider'

//set up state for component
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
  };
  
  //gets the number of people in the party, include taxes and tip percent from the local storage or sets default values if local storage is empty
  componentDidMount = () => {
    this.setState({
      includeTax: localStorage.getItem("defaultTax") === 'false' ? false: true,
      tipPercent: localStorage.getItem("defaultTipPercent") || 15,
      numPeople: localStorage.getItem("defaultPartyMemebrs") || 3,
    });
  };
  
  //event for tip slider, sets the tip percent in the sate with the value of the slider
  handleTipChange = value => {
    this.setState({
      tipPercent: value,
      personAmount: this.calculatePerPerson(),
    })
    
  };

  //event for number of people slider, sets the number of people in the sate with the value of the slider
  handlePeopleChange = value => {
    this.setState({
      numPeople: value,
      personAmount: this.calculatePerPerson(),
    })
  };

   //change event for the fields that take in the total and tax amount
 updateBill = event =>{
    let { name, value } = event.target;
    //drops the decimal and then converts the number to a 2 digit decimal 
    //prevents user from having to enter in a decimal while they type
    value = value.replace(/\./g, '');
    let temp = value.replace(/^0+/, '');
    this.setState({ [name]:  parseInt(temp)/100});
    let _this = this;
    let _cb = this.calculatePerPerson;
    setTimeout(
      function(){ 
        _this.setState({
          personAmount: _cb(),
        }); 
    }, 5);
  }

  //change event for the include taxes settings
  changeTax = event =>{
    this.setState({
      includeTax: (event.target.checked),
    });
    let _this = this;
    let _cb = this.calculatePerPerson;
    setTimeout(
      function(){ 
        _this.setState({
          personAmount: _cb(),
        }); 
    }, 5);
  }

  //main function that takes in the totals and generates the values for the tip total and grand total
  calculatePerPerson = () => {
    let tippableAmount = this.state.includeTax ? this.state.totalBill : this.state.totalBill - this.state.taxAmount;
    let totalTip = tippableAmount * (this.state.tipPercent/100);
    let personTip = totalTip / this.state.numPeople;    
    return this.state.includeTax ? personTip + (this.state.totalBill/this.state.numPeople) : personTip + ((this.state.totalBill - this.state.taxAmount) / this.state.numPeople) +( this.state.taxAmount /  this.state.numPeople);
  }

  render() {  
    //extracts values from the state
    const { numPeople, tipPercent, personAmount, totalBill, includeTax, taxAmount } = this.state;
    //default labels for the tip percent slider component
    const horizontalLabels = {
      5: '5',
      15: '15',
      25: '25',
    }
  
    return (
      <section className="mainHolder container">
        <h3>Even Steven</h3>
        
        {/* Number of People Slider */}
        <span>Number in Party</span>
        <div id="peopleslider">
          <Slider name="people" min={2} max={12} value={numPeople} handleLabel={numPeople.toString()}  onChange={this.handlePeopleChange}/>
        </div>        
        
        {/* Top two fields for total and taxes */}
        <div className='row'>
          <div className="col s6">
            <span>Total Bill</span>
            <TextInput type="number"  name="totalBill" value={totalBill.toFixed(2)} onChange={this.updateBill} />
          </div>
          <div className="col s6">
            <span>Tax Amount</span>
            <TextInput type="number" name="taxAmount" value={taxAmount.toFixed(2)} onChange={this.updateBill}  />
          </div>
        </div>     
        
        {/* Taxes Switch */}
        <span style={{width:'50%', display:'inline-block'}}>Include Taxes</span>
        <Switch offLabel="No" onLabel="Yes" checked={includeTax} onChange={this.changeTax}/>  
        
        {/* Tip percent Slider */}
        <span>Tip Percent</span>
        <div id="tipslider">
          <Slider name="tipPercent" min={0} max={30} value={tipPercent} handleLabel={tipPercent.toString()} onChange={this.handleTipChange}  labels={horizontalLabels} />
        </div>

        {/* Bottom two fields for tip total and total with tip */}
        <div className='row'>
          <div className="col s6">
            <span>Individual Tip Amount</span>
            <TextInput disabled value={(personAmount-(totalBill/numPeople)).toFixed(2)} />
          </div>
          <div className="col s6">
            <span>Amount Per Person</span>
            <TextInput disabled value={personAmount.toFixed(2)} />
          </div>
        </div>
        
        {/* Home Button */}
        <p>
          <Link to="/"><button className="btn">Home</button></Link>
        </p> 
      </section>
    )
  }
}
