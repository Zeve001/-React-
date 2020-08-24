import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildContrils from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";


import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from '../../store/action/index';
import {connect} from 'react-redux';


// const ingredientPrice = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7,
// };

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    //purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // axios
    //   // .get("https://zeven-burger.firebaseio.com/ingredients.json")
    //   // .then((response) => {
    //   //   this.setState({ ingredients: response.data });
    //   // })
    //   // .catch(error => 
    //   //   this.setState({error: true}));
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0 ;
  }

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   const priceAddition = ingredientPrice[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients,
  //   };
  //   updatedIngredients[type] = updatedCount;

  //   const priceDeduction = ingredientPrice[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;
  //   this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  purchaseHandler = () => {
    if(this.props.isauthed) {
      this.setState({ purchasing: true });
    }
    else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
    
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
  //   //alert('You continue!')
 
  //   const queryParams = [];
  //   for (let i in this.state.ingredients) {
  //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
  //   }
  //   queryParams.push('price=' +this.props.price);
  //   const queryString = queryParams.join('&')
  //   this.props.history.push({pathname: '/checkout',
  //                           search: '?' + queryString});
  this.props.onInitPurchase();
  this.props.history.push('/checkout')
  };

  render() {
    const disableedInfo = {
      ...this.props.ings,
    };
    for (let key in disableedInfo) {
      disableedInfo[key] = disableedInfo[key] <= 0;
    }

    let orderSummary = null;
    
    let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;

    if(this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildContrils
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoveed}
            disabled={disableedInfo}
            price={this.props.price}
            purchasable={!this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isauthed={this.props.isauthed}
          />
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );

    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
    return{
      ings:state.reducer.ingredients,
      price: state.reducer.totalPrice,
      error: state.reducer.error,
      isauthed: state.auth.token !== null,
    };
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
    onIngredientRemoveed: (ingName) => dispatch(actionTypes.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actionTypes.initIngredients()),
    onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actionTypes.setAuthRedirectPath(path))
  }
}




export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));
