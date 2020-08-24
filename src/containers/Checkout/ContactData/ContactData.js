import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import { withRouter} from "react-router-dom";
import Input from "../../../components/UI/Input/Input";
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/action/index'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
          elementType: 'input',
          elementConfig:{
              type: 'text',
              placeholder: 'Your Name'
          },
          value:'',
          validation: {
              required: true
          },
          valid:false,
          touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig:{
            type: 'text',
            placeholder: 'Your Street'
        },
        value:'',
        validation: {
            required: true
        },
        valid:false,
        touched: false,
    },
      zipCode: {
        elementType: 'input',
        elementConfig:{
            type: 'text',
            placeholder: 'Your Zip Code'
        },
        value:'',
        validation: {
            required: true,
            minLength:5,
            maxLength:5,
        },
        valid:false,
        touched: false,
    },
      country: {
        elementType: 'input',
        elementConfig:{
            type: 'text',
            placeholder: 'Country'
        },
        value:'',
        validation: {
            required: true
        },
        valid:false,
        touched: false,
    },
      email: {
        elementType: 'input',
        elementConfig:{
            type: 'email',
            placeholder: 'Your Email'
        },
        value:'',
        validation: {
            required: true
        },
        valid:false,
        touched: false,
    },
      deliveryMethod: {
        elementType: 'select',
        elementConfig:{
            options:[{value: 'fastest', displayValue: 'Fastst'},
                     {value: 'cheapest', displayValue: 'Cheapest'}]
        },
        value:'fastest',
        valid:true,
        validation: {}
    },
    },
    //loading: false,
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    //this.setState({ loading: true });
    const formData = {};
    for (let forElementIdentifier in this.state.orderForm) {
        formData[forElementIdentifier] = this.state.orderForm[forElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token);
    // axios
    //   .post("/orders.json", order)
    //   .then((response) => {
    //     this.setState({ loading: false });
    //     this.props.history.push("/");
    //   })
    //   .catch((error) => this.setState({ loading: false }));
  };

  checkValidity(value,rules) {
      let isvalid = true;

      if(rules.required) {
        isvalid = value.trim() !=='' && isvalid;
      }

      if (rules.minLength) {
          isvalid = value.length >= rules.minLength && isvalid
      }

      if (rules.maxLength) {
        isvalid = value.length <= rules.maxLength && isvalid
    }
      return isvalid;
  }

  changedHandler = (event, inputIdnetifier) => {
      const updatedOrderForm = {
          ...this.state.orderForm
      };
      const updatedFormElement = {
          ...updatedOrderForm[inputIdnetifier]
      };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
      updatedFormElement.touched = true;
      updatedOrderForm[inputIdnetifier] = updatedFormElement;

      let formIsValid = true;
      for (let inputIdentifer in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifer].valid && formIsValid
      }

      this.setState({orderForm: updatedOrderForm, formIsValid:formIsValid});
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
        formElementsArray.push({
            id:key,
            config: this.state.orderForm[key]
        })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidted={formElement.config.validation}
                touched={formElement.config.touched}
                change={(event) => this.changedHandler(event,formElement.id)}/>
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    ings:state.reducer.ingredients,
    price: state.reducer.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  }

}

export default connect(mapStateToProps,mapDispatchToProps) (withRouter ((ContactData)));
