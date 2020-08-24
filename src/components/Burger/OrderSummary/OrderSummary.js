import React, { Fragment } from 'react'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
      .map(igkey => {
      return <li key={igkey}><span style={{textTransform: 'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}</li>
      })

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
            <p>Continue to check out?</p>
            <Button btnType="Danger" clicked={props.purchaseCanceled}>Cancel</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
        </Fragment>
    )

}

export default orderSummary;