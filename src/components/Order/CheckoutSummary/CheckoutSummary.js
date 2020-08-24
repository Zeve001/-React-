import React from "react";
import Burger from "../../Burger/Burger";
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hopr it tastes well!</h1>
      <div style={{ height: "auto", width: "100%", margin: "auto", paddingBottom: '20px'}}>
        <Burger ingredients={props.ingredients}/>
      </div>
      <div style={{paddingTop:'50px'}}>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>

      </div>

    </div>
  );
};

export default checkoutSummary;
