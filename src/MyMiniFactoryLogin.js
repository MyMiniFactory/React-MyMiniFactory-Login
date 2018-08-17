import React, { Component } from 'react';

import { toQuery } from './utils';


class MyMiniFactoryLogin extends Component {

  static defaultProps = {
    buttonText: 'Sign in to MyMiniFactory',
    onRequest: () => {},
    onSuccess: () => {},
    onFailure: () => {},
  }

  constructor(props){
    super(props);
    this.onClick = this.onClick;
  }

  onClick = () => {
    const { clientId, scope, redirectUri } = this.props;
    const search = toQuery({
      client_id: clientId,
      scope,
      redirect_uri: redirectUri,
    });
  }

  render() {
    const { className, buttonText, children } = this.props;

    return (<button className={className} onClick={this.onClick}>{children || buttonText}</button>);
  }
}
export default MyMiniFactoryLogin;
