import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./pages/Home/Home";
import Even from "./pages/Even/Even";
import Itemize from "./pages/Itemize/Itemize";
import TotalSum from "./pages/TotalSum/TotalSum";
import Settings from "./pages/Settings/Settings";
import ModalWindow from "./components/Modal/Modal"
import './App.css';
import TopNav from "./components/TopNav/TopNav";

//variables for the modal
let title="", content="";

function App() {
  //determines modal state
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    //gets the url of the current page
    let url = document.location.pathname.toString();

    //conditional that defines the modal title and help text for each page
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
      Drag the slider to increase or decrease if the item you are pricing needs to be split between a group of people. (Ex: 3 people shared 1 appetizer.)\n
      Enter in the item price and click the add item button. Keep adding items to include all items for the one individual. As you add items, the remaining balance decreases.\n
      When you have provided the total for the individual, click on the clear button to start calculating the totals for the next individual by adding their items. Note you will need to add back in the portion of any split item the new individual shared.\n
      Clicking the reset button resets all the totals in the event you missed something and want to start over.`
    }else if(url.includes('Settings')){
      title="Setting";
      content = `In the settings you can enter in the default values for the tip percentage, number of people in the party and whether you want to include taxes in your tip calculations\n
      Each change is auto-saved into your cookies. Deleting the cookies removes these values.`
    }else{
      title="Tip 'em";
      content = `Tip 'em allows you to choose from 0% to 30%. You can also choose to include the taxes in the top calculation or exclude it.\n
      Total Sum applies the tip to one lump sum for the entire purchase.\n
      Even Steven divides the check into even parts.\n
      Itemized allows you to assign specific dollar amounts per item and you can even split the cost of an item between varying multiple people.\n
      Click on any one of the buttons to enter that tip calculator.`
    };
    //fires off function to open modal
    setOpen(true);
  }

  function handleClose() {
    //closes modal
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
          <Route exact path="/Settings" component={Settings} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
