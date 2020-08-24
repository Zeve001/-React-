import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from '../../store/action/index'

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      meat: 0,
      bacon: 0,
      cheese: 0,
    },
    totalprice: 0,
  };

  componentDidMount () {
    this.props.onInitPurchase();
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, totalprice: price });
  }

  purchaseCanceledHandler = () => {
    this.props.history.goBack();
  };

  purchaseContinuedHandler = () => {
    this.props.history.replace("./Checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
       const purchasedRedirected = this.props.purchased? <Redirect to='/'/> : null;
      summary = (
        <div>
            {purchasedRedirected}
          <CheckoutSummary
            ingredients={this.props.ings}
            purchaseCanceled={this.purchaseCanceledHandler}
            purchaseContinued={this.purchaseContinuedHandler}
          />

          <Route
            path={this.props.match.path + "/contact-data"}
            //render={() => (<ContactData ingredients={this.props.ings} price={this.state.totalprice}/>)}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.reducer.ingredients,
    purchased: state.order.purchased,
  };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
