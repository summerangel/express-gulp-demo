/**
 * Created by summer on 16/12/26.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      <h1>Hello React!!</h1>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);