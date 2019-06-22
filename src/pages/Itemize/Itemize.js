import React, { PureComponent } from 'react'
import { Switch, TextInput } from 'react-materialize';
import {Link} from "react-router-dom";
import Slider from 'react-rangeslider'

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
  componentDidMount = () => {
    this.setState({
      includeTax: localStorage.getItem("defaultTax") === 'false' ? false: true,
      tipPercent: localStorage.getItem("defaultTipPercent") || 15,
    });
  };
  handleTipChange = value => {
    this.setState({
      tipPercent: value,
      indTotalWTip: this.calculatePerPerson(),
    })    
  };
  handleSplitChange = value => {
    this.setState({
      splitPrice: value,
    })    
  };
  updateSelf = event => {    
    let { name, value } = event.target;
    //drops the decimal and then converts the number to a 2 digit decimal 
    //prevents user from having to enter in a decimal while they type
    value = value.replace(/\./g, '');
    let temp = value.replace(/^0+/, '');
    this.setState({ [name]: parseFloat(temp)/100 });
  };
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
  addToSubTotal= () => {  
    let subtotal = this.state.indSubTotal;
    let curItem = this.state.itemPrice / this.state.splitPrice;
    let currentSubTotal = subtotal + curItem;
    let allSubtotals = this.state.allSubtotals;
    
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
  calculatePerPerson = () => {
    let taxpercent = (this.state.totalBill - (this.state.totalBill - this.state.taxAmount)) / (this.state.totalBill - this.state.taxAmount);
    let subtotal = this.state.indSubTotal;     
    if(this.state.includeTax){ 
      return (subtotal + (taxpercent * subtotal)) * (1 + (this.state.tipPercent/100));
    }else{
      return (subtotal * (1 + (this.state.tipPercent/100))) +  (taxpercent * subtotal);
    }
  };
  clearIndividual = () => {
    this.setState({
      indSubTotal: 0,
      itemPrice:0,
      splitPrice:1,
      indTotalWTip:0,
    });
  };
  render() {
    const {tipPercent, indTotalWTip, totalBill, includeTax, taxAmount, itemPrice, splitPrice, allSubtotals } = this.state;
    const horizontalLabels = {
      5: '5',
      15: '15',
      25: '25',
    }
    return (
      <section className="mainHolder container">
        <h3>Itemize</h3>
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
        
        
        <span style={{width:'50%', display:'inline-block'}}>Include Taxes</span>
        <Switch offLabel="No" onLabel="Yes" checked={includeTax} onChange={this.changeTax}/>  
        
        <span>Tip Percent</span>
        <div id="tipslider">
          <Slider name="tipPercent" min={0} max={30} value={tipPercent} handleLabel={tipPercent.toString()} onChange={this.handleTipChange} labels={horizontalLabels}/>
        </div>


        <div className='row'>
          <span style={{width:'80%', margin:'0 auto', display:'block', textAlign:'left'}}>Speicfy the split, enter the price for individuals item and click Add Item.</span>
          
          <div id="splitSlider">
            <Slider min={1} max={12} value={splitPrice} handleLabel={splitPrice.toString()}  onChange={this.handleSplitChange}/>
          </div><div className="col s6">
            <span>Item Price</span>
            <TextInput type="number"  name="itemPrice" value={itemPrice.toFixed(2)} onChange={this.updateSelf}/>
          </div>
          <div className="col s6">
          <span>&nbsp;</span>
            <p>
              <button className="btn" onClick={this.addToSubTotal}>Add Item</button>
            </p>
          </div>          
        </div>

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

        <div className='row'>          
          <div className="col s6">   
          <span>Tip Amount</span>         
            <TextInput disabled type="number" value={indTotalWTip.toFixed(2)} />
          </div>
          <div className="col s6"> 
            <span>Total with Tip</span>             
            <TextInput disabled type="number" value={indTotalWTip.toFixed(2)} />
          </div>
        </div>
        <div className='row'>
          <div className="col s6">  
            <p>
              <button className="btn" onClick={this.clearIndividual}>Clear</button>
            </p>
          </div>
          <div className="col s6">  
            <p>
              <button className="btn" onClick={this.clearIndividual}>Reset</button>
            </p>
          </div>
        </div>
        <p style={{backgroundColor:'#e2e0c5', paddingTop:"15px", marginTop:'0px'}}>
          <Link to="/"><button className="btn btnHome">Home</button></Link>
        </p>
      </section>
    )
  }
}
