import React from 'react';
import ReactDOM from 'react-dom';
import MyMiniFactoryLogin from '../src/MyMiniFactoryLogin';


const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);


ReactDOM.render(
    <MyMiniFactoryLogin
        clientKey="character-creator"
        redirectUri="http://localhost:3000"
        onSuccess={onSuccess}
        onFailure={onFailure}
    />,
    document.getElementById('root')
);