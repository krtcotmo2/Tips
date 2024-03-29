import React from "react";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link} from "react-router-dom";
import "./Modal.css";

//Materalize modal window
//On close event for teh OK button
export default function Modal(props){
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{props.title}<Link to="/Settings"><button className="btn" onClick={props.onClose}>Settings</button></Link></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">            
              {props.content.split('\n').map((item, key) => {
                return <span key={key}>{item}<br/></span>
              })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary" className="btn">OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}