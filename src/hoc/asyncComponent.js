import React, { Component } from "react";

/* importComponent function needs to return. The function will return a promise. 
cmp.default -> 
component property will be set to load dynamically. 
*/

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    };

    componentDidMount() {
      importComponent().then((cmp) => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default asyncComponent;
