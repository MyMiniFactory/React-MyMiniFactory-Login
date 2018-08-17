import React from 'react';
import ReactDOM from 'react-dom';
import MyMiniFactoryLogin from './MyMiniFactoryLogin';

const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);

ReactDOM.render(
    <MyMiniFactoryLogin
        clientId="character-creator"
        redirectUri="https://myminifactory.com/character-creator"
        onSuccess={onSuccess}
        onFailure={onFailure}
    />,
    document.getElementById('example')
);
