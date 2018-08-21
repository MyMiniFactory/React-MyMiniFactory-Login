import React, { Component } from 'react';

import Popup from './Popup';
import { toQuery } from './utils';


class MyMiniFactoryLogin extends Component {

  static defaultProps = {
    buttonText: 'Sign in to MyMiniFactory',
    onRequest: () => { },
    onSuccess: () => { },
    onFailure: () => { },
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick;
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

  createPopup = (url, title, width, height) => {
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    this.externalWindow = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`
    );

    this.codeCheck = setInterval(() => {
      try {
        const popup = this.externalWindow;

        if (!popup || popup.closed !== false) {
          console.error('The popup was closed');
          clearInterval(this.codeCheck);
          return;
        }

        console.log(popup.location.href)

        if (popup.location.href === this.url || popup.location.pathname === 'blank') {
          return;
        }

        // const params = toParams(popup.location.search.replace(/^\?/, ''));

        // resolve(params);

        this.close();
      } catch (error) {
        console.error(error)
      }
    }, 500);
      // const popup = this.externalWindow;
      // console.log(new URL(this.externalWindow.location))
      // if (this.externalWindow.closed){
      //   clearInterval(this.codeCheck)
      // }

    // this.externalWindow.onbeforeunload = () => clearInterval(this.codeCheck)
  };

  onClick = () => {
    const { clientId, redirectUri } = this.props;
    const authServer = "https://auth.myminifactory.com/web/authorize?"
    const search = toQuery({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "token",
      state: "abcthisisatest"
    });

    // const popup = this.popup = Popup.open(
    //   authServer + search,
    //   620, //height
    //   500, //width
    //   "MyMiniFactory Login"
    // );

    this.createPopup(
      authServer + search,
      "MyMiniFactory Login",
      500, //width
      620, //height
    )
  }

  render() {
    const { className, buttonText, children } = this.props;

    return (<button className={className} onClick={this.onClick}>{children || buttonText}</button>);
  }
}
export default MyMiniFactoryLogin;
