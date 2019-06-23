import React, { PureComponent } from 'react'
import { Switch, TextInput } from 'react-materialize';
import {Link} from "react-router-dom";
import Slider from 'react-rangeslider'

//value for the current tax percent calculated by getting the total bill and the total taxes
let taxpercent = 0;

//set up state for component
export default class Itemize extends PureComponent {
  constructor (props, context) {
    super(props, context)
    this.state = {
      tipPercent: 15,
      indTotalWTip:0,
      totalBill:0,
      taxAmount:0,
      includeTax:true,
      itemPrice:0,
      splitPrice:1,
      indSubTotal:0,
      allSubtotals:0,
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
      indTotalWTip: this.calculatePerPerson(),
    })    
  };
  
  //event for split slider, sets the split price in the sate with the value of the slider
  handleSplitChange = value => {
    this.setState({
      splitPrice: value,
    })    
  };

  //change event for the fields that take in the total and tax amount
  updateItemPrice = event => {    
    let { name, value } = event.target;
    //drops the decimal and then converts the number to a 2 digit decimal 
    //prevents user from having to enter in a decimal while they type
    value = value.replace(/\./g, '');
    let temp = value.replace(/^0+/, '');
    this.setState({ [name]: parseFloat(temp)/100 });
  };

  //change event for the fields that take in the total and tax amount
  updateBill = event => {    
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
          indTotalWTip: _cb(),
        }); 
    }, 5);
  }; 

  //change event for the include taxes settings
  changeTax = event => {
    this.setState({
      includeTax: (event.target.checked),
    });
    let _this = this;
    let _cb = this.calculatePerPerson;
    setTimeout(
      function(){ 
        _this.setState({
          indTotalWTip: _cb(),
        }); 
    }, 5);    
  };

  //keeps a running subtotal for the entire bill as well as the individual subtotal - stored in the state
  addToSubTotal= () => {  
    //get values from the state
    let subtotal = this.state.indSubTotal;
    let curItem = this.state.itemPrice / this.state.splitPrice;
    let currentSubTotal = subtotal + curItem;
    let allSubtotals = this.state.allSubtotals;
    
    //reset/update state to 0 after values are acquired
    this.setState({
      indSubTotal: currentSubTotal,
      itemPrice:0,
      splitPrice:1,
      allSubtotals:allSubtotals + curItem,
    });
    let _this = this;
    let _cb = this.calculatePerPerson;
    setTimeout(
      function(){ 
        _this.setState({
          indTotalWTip: _cb(),
        }); 
    }, 5);
  };

  //main function that takes in the totals and generates the values for the tip total and grand total
  calculatePerPerson = () => {
    taxpercent = (this.state.totalBill - (this.state.totalBill - this.state.taxAmount)) / (this.state.totalBill - this.state.taxAmount);
    let subtotal = this.state.indSubTotal;  
    if(this.state.includeTax){  
      //gets the total for the individual and adds taxes before applying the tip percent   
      let bill = subtotal + (taxpercent * subtotal);   
      return bill * (1 + (this.state.tipPercent/100));
    }else{
      //gets the total for the individual applies the tip percentage and adds taxes
      return subtotal + (subtotal*this.state.tipPercent/100) + (subtotal*taxpercent);
    }
  };

  //click event that zeroes out the individual but keeps the bill subtotal roling
  clearIndividual = () => {
    this.setState({
      indSubTotal: 0,
      itemPrice:0,
      splitPrice:1,
      indTotalWTip:0,
    });
  };

  //click event that zeroes out the individual the bill subtotal
  clearAll = () => {
    this.setState({
      indSubTotal: 0,
      itemPrice:0,
      splitPrice:1,
      indTotalWTip:0,
      allSubtotals:0,
    });
  };

  render() {
    //extracts values from the state
    const {tipPercent, indTotalWTip, totalBill, includeTax, taxAmount, itemPrice, splitPrice, allSubtotals, indSubTotal } = this.state;
    //default labels for the tip percent slider component
    const horizontalLabels = {
      5: '5',
      15: '15',
      25: '25',
    }
    return (
      <section className="mainHolder container">
        <h3>Itemize</h3>
        
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
          <span className="left-align note">Needed for the tax rate.</span>
        </div>
        
        {/* Taxes Switch */}
        <span style={{width:'50%', display:'inline-block'}}>Include Taxes</span>
        <Switch offLabel="No" onLabel="Yes" checked={includeTax} onChange={this.changeTax}/>  
        
        {/* Tip percent Slider */}
        <span>Tip Percent</span>
        <div id="tipslider">
          <Slider name="tipPercent" min={0} max={30} value={tipPercent} handleLabel={tipPercent.toString()} onChange={this.handleTipChange} labels={horizontalLabels}/>
        </div>

        {/* Split Slider */}
        <div className='row'>
          <span style={{width:'80%', margin:'0 auto', display:'block', textAlign:'left'}}>Speicfy the split, enter the price for individuals item and click Add Item.</span>
          <div id="splitSlider">
            <Slider min={1} max={12} value={splitPrice} handleLabel={splitPrice.toString()}  onChange={this.handleSplitChange}/>
          </div>

          {/* Item Price and Add Item button */}
          <div className="col s6">
            <span>Item Price</span>
            <TextInput type="number"  name="itemPrice" value={itemPrice.toFixed(2)} onChange={this.updateItemPrice}/>
          </div>
          <div className="col s6">
            <span>&nbsp;</span>
            <p>
              <button className="btn" onClick={this.addToSubTotal}>Add Item</button>
            </p>
          </div>          
        </div>

        {/* Two fields that show the original bill and how much of it remains */}
        <div className='row'>
          <div className="col s6">
            <span>Inital Bill</span>
            <TextInput disabled type="number"  name="totalBill" value={(totalBill - taxAmount).toFixed(2)} />
          </div>
          <div className="col s6">
            <span>Remaining Amount</span>
            <TextInput disabled type="number" name="taxAmount" value={(totalBill - allSubtotals - taxAmount).toFixed(2)}  />
          </div>
        </div>

        {/* Two fields that show thetip amount and the total with tip for the individual */}
        <div className='row'>          
          <div className="col s6">   
            <span>Tip Amount</span>         
            <TextInput disabled type="number" value={includeTax ? ((indSubTotal + (indSubTotal * taxpercent)) * tipPercent / 100).toFixed(2) : (indSubTotal * tipPercent / 100).toFixed(2)} />
          </div>
          <div className="col s6"> 
            <span>Total with Tip</span>             
            <TextInput disabled type="number" value={indTotalWTip.toFixed(2)} />
          </div>
        </div>

        {/* Two buttons to clear and reset page */}
        <div className='row'>
          <div className="col s6">  
            <p>
              <button className="btn" onClick={this.clearIndividual}>Clear</button>
            </p>
          </div>
          <div className="col s6">  
            <p>
              <button className="btn" onClick={this.clearAll}>Reset</button>
            </p>
          </div>
        </div>
        
        {/* Home Button */}
        <p style={{backgroundColor:'#e2e0c5', paddingTop:"15px", marginTop:'0px'}}>
          <Link to="/"><button className="btn btnHome">Home</button></Link>
        </p>
      </section>
    )
  }
}
