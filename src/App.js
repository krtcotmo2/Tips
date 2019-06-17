import React from "react";
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from "react-router-dom";
import Home from "./pages/Home/Home";
import Even from "./pages/Even/Even";
import Itemize from "./pages/Itemize/Itemize";
import TotalSum from "./pages/TotalSum/TotalSum";
//import M from "materialize-css";
import ModalWindow from "./components/Modal/Modal"

import './App.css';
import TopNav from "./components/TopNav/TopNav";

let title = "Tip 'em"
let content = "Lorem ipsum dolor sit amet, consectetur ad\nipiscing elit. Nam accumsan pharetra arcu, nec consequat velit maximus vitae. Proin elit neque, venenatis non nisl sed, porttitor pharetra tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras vulputate placerat ex, ut efficitur felis venenatis consectetur."

function App() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
  let url = document.location.pathname.toString();
  if(url.includes('Total')){
    title="Total Sum";
    content = `Enter in the total amount for the bill. (You do not need to add the decimal places.)\n
    Enter in the total amount of the tax for the bill. (Not needed if you are going to include the tax as part of the tip calculation.)\n
    Toggle the Include Taxes switch if you do not intend to include takes in your calculation.\n
    Drag the slider to increase or decrease the tip percentage.`;
  }else if(url.includes('Even')){
    title="Even Steven";
    content = `Drag the slider to increase or decrease the number of members in your party.\n
    Enter in the total amount for the bill. (You do not need to add the decimal places.)\n
    Enter in the total amount of the tax for the bill. (Not needed if you are going to include the tax as part of the tip calculation.)\n
    Toggle the Include Taxes switch if you do not intend to include takes in your calculation.\n
    Drag the slider to increase or decrease the tip percentage.`;
  }else if(url.includes('Itemize')){
    title="Itemize";
    content = `Enter in the total amount and total taxes for the bill. (This is needed to determine the exact tax rate.)\n
    Toggle the Include Taxes switch if you do not intend to include takes in your calculation.\n
    Drag the slider to increase or decrease the tip percentage.\n
    Drag the slider to increase or decrease if the item you are prciing needs to be split between a geoup of people. (Ex: 3 people shared 1 appitizer.)\n
    Enter in the item price and click the add item button. Keep adding items to include all items for the one individual. As you add items, the remaining balance decreases.\n
    When you have provided the total for the individual, click on the clear button to start calculating the totals for the next individual by adding their items. Note you will need to add back in the portion of any split item the new individual shared.\n
    Clicking the reset button resets all the totals in the event you missed something and want to start over.`

  }else{
    title="Tip 'em";
    content = `Tip 'em allows you to chose from 0% to 30%. You can also choose to include the taxes in the top calculation or exclude it.\n
    Total Sum applies the tip to one lump sum for the entire purchase.\n
    Even Steven divides the check into even parts.\n
    Itemized allows you to asign specific dollar amounts per item and you can even split the cost of an item between varying multiple people.\n
    Click on any one of the buttons to enter that tip calculator.`
  }   
  console.log(title)
  setOpen(true);
}

function handleClose() {
  setOpen(false);
}
  return (
    <Router>
    <TopNav openModal={handleClickOpen}></TopNav>
    <ModalWindow 
      id="helpwindow"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      title={title}
      content={content}
    />
    <div className="App">
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Even" component={Even} />
          <Route exact path="/Itemize" component={Itemize} />
          <Route exact path="/TotalSum" component={TotalSum} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
