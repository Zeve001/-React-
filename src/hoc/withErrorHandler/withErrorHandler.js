import React, { Fragment, Component } from "react";

import Modle from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
      state = {
          error: null,
      }

      componentDidMount () {
          this.reqInterceptor = axios.interceptors.request.use(req => {
            this.setState({error: null});
            return req;
          })
          this.resInterceptor = axios.interceptors.response.use(res => res, error => {
            this.setState({error: error})
          })
      }

      componentWillUnmount () {
           axios.interceptors.request.eject(this.reqInterceptor)
           axios.interceptors.response.eject(this.resInterceptor)
      }

      errorConfirmedHandler = () => {
        this.setState({error: null})
      }
    render() {
      return (
        <Fragment>
          <Modle show={this.state.error} modalClosed={this.errorConfirmedHandler}>{this.state.error? this.state.error.message : null }</Modle>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
