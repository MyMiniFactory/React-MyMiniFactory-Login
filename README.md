
# React MyMiniFactory Login

React component for MyMiniFactory login.

## Example

Just simply import the React Component like so:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import MyMiniFactoryLogin from 'MyMiniFactoryLogin';


const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);


ReactDOM.render(
    <MyMiniFactoryLogin
        clientKey="character-creator"
        redirectUri="http://localhost:3000"
        onSuccess={onSuccess}
        onFailure={onFailure}
    />,
    document.getElementById('example')
);
```

## Props



| Prop              | Type                  | Explication                                    |
| :----------       | :-------------------- | :--------------------------------------------- |
| **`clientKey`**   | `{string}` _required_ | Client ID for MyMiniFactory OAuth application. |
| **`redirectUri`** | `{string}` _required_ | Registered redirect URI for MyMiniFactory OAuth application. |
| **`className`**   | `{string}`            | CSS class for the login button.                |
| **`buttonText`**  | `{string}`            | Text content for the login button.             |
| **`onSuccess`**   | `{function}`          | Callback for successful login. An object will be passed as an argument to the callback, e.g. `{ "access_token": "..." }`. |
| **`onFailure`**   | `{function}`          | Callback for errors raised during login.       |
