import React from 'react';
import ReactDOM from 'react-dom';
import MyMiniFactoryLogin from './MyMiniFactoryLogin';

const onSuccess = response => console.log(response);
const onFailure = response => console.error(onFailure);

ReactDOM.render(
    <MyMiniFactoryLogin
        clientId=""
        redirectUri=""
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText="Connect her"
    />,
    document.getElementById('example')
);
