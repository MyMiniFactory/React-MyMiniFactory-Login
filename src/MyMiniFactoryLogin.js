import React, { Component } from 'react';

class MyMiniFactoryLogin extends Component {

  onBtnClick = () => {
    console.log('Hello')
  }

  render() {
    const { className, buttonText, children } = this.props;

    return (<button className={className} onClick={this.OnClick}>{children || buttonText}</button>);
  }
}
export default MyMiniFactoryLogin;
