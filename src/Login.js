import React, { Component } from 'react';
import PropTypes from 'prop-types';


class MyMiniFactoryLogin extends Component {

    constructor(codeCheck, externalWindow) {
        this.externalWindow = this.externalWindow;
        this.codeCheck = this.codeCheck;
    }


    static defaultProps = {
        width: 500,
        height: 500,
        url: "",
        title: ""
    };

    createPopup = () => {
        const { url, title, width, height, onCode } = this.props;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2.5;
        this.externalWindow = window.open(
            url,
            title,
            `width=${width},height=${height},left=${left},top=${top}`
        );

        this.codeCheck = setInterval(() => {
            try {
                const params = new URL(this.externalWindow.location).searchParams;
                const code = params.get("code");
                if (!code) {
                    return;
                }
                clearInterval(this.codeCheck);
                onCode(code);
                this.externalWindow.close();
            } catch (e) { }
        }, 20);

        this.externalWindow.onbeforeunload = () => clearInterval(this.codeCheck)
    };

    render() {
        return <div onClick={this.createPopup}> {this.props.children} </div>;
    }

    componentWillUnmount() {
        if (this.externalWindow) {
            this.externalWindow.close();
        }
    }
}


export default MyMiniFactoryLogin;