import React, { Component } from 'react';

import Popup from './Popup';
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

  onRequest = () => {
    this.props.onRequest();
  }

  onSuccess = (data) => {
    if (!data.code) {
      return this.onFailure(new Error('\'code\' not found'));
    }
    this.props.onSuccess(data);
  }

  onFailure = (error) => {
    this.props.onFailure(error);
  }

  onClick = () => {
    const { clientId, redirectUri } = this.props;
    const authServer = "https://auth.myminifactory.com/web/authorize?"
    const search = toQuery({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "token",
      state: "abcthisisatest"
    });

    console.log(authServer+search)

    const popup = this.popup = Popup.open(
      authServer+search,
      300, //height
      300, //width
      "MyMiniFactory Login"
    );

    this.onRequest();
    popup.then(
      data => this.onSuccess(data),
      error => this.onFailure(error)
    );
  }

  render() {
    const { className, buttonText, children } = this.props;

    return (<button className={className} onClick={this.onClick}>{children || buttonText}</button>);
  }
}
export default MyMiniFactoryLogin;
