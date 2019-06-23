import React, { PureComponent } from 'react'
import { Switch, TextInput } from 'react-materialize';
import {Link} from "react-router-dom";
import Slider from 'react-rangeslider'

//set up state for component
export default class TotalSum extends PureComponent {
  constructor (props, context) {
    super(props, context)
    this.state = {
      tipPercent: 15,
      totalWTip:0,
      totalBill:0,
      taxAmount:0,
      includeTax:true
    }
  };

  //gets the includes taxes and tip percent from the local storage or sets default values if local storage is empty
  componentDidMount = () => {
    this.setState({
      includeTax: localStorage.getItem("defaultTax") === 'false' ? false: true,
      tipPercent: localStorage.getItem("defaultTipPercent") || 15,
    });
  };

  //event for tip slider, sets the tip percent in the sate with the value of the slider
  handleTipChange = value => {
    this.setState({
      tipPercent: value,
      totalWTip: this.calculatePerPerson(),
    });    
  };

  //change event for the fields that take in the total and tax amount
  updateBill = event =>{   
    let { name, value } = event.target;
    //drops the decimal and then converts the number to a 2 digit decimal 
    //prevents user from having to enter in a decimal while they type
    value = value.replace(/\./g, '');
    let temp = value.replace(/^0+/, '');
    this.setState({ [name]: parseInt(temp)/100});
    let _this = this;
    let _cb = this.calculatePerPerson;
    setTimeout(
      function(){ 
        _this.setState({
          totalWTip: _cb(),
        }); 
    }, 5);
  };

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
          totalWTip: _cb(),
        }); 
    }, 5);    
  };

  //main function that takes in the totals and generates the values for the tip total and grand total
  calculatePerPerson = () => {
    let tippableAmount = this.state.includeTax ? this.state.totalBill : this.state.totalBill - this.state.taxAmount;
    let totalTip = tippableAmount * (this.state.tipPercent/100);    
    return totalTip + this.state.totalBill;
  };

  render() {
    //extracts values from the state
    const {tipPercent, totalWTip, totalBill, includeTax, taxAmount } = this.state;
    //default labels for the tip percent slider component
    const horizontalLabels = {
      5: '5',
      15: '15',
      25: '25',
    }

    return (
      <section className="mainHolder container">
        <h3>Total Sum</h3>
        
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
          <Slider name="tipPercent" min={0} max={30} value={tipPercent} handleLabel={tipPercent.toString()} onChange={this.handleTipChange} labels={horizontalLabels}/>
        </div>

        {/* Bottom two fields for tip total and total with tip */}
        <div className='row'>
          <div className="col s6">
            <span>Tip Amount</span>
            <TextInput disabled value={(totalWTip-totalBill).toFixed(2)} />
          </div>
          <div className="col s6">
            <span>Amount Including Tip</span>
            <TextInput disabled value={totalWTip.toFixed(2)} />
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
