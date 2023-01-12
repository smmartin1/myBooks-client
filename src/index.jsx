import React from 'react';
import ReactDOM from 'react-dom';

// Import index.scss
import './index.scss';

// Main component
class MyFlixApplication extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <div>Shall I compare thee to a summer's day?</div>
      </div>
    );
  }
}

// Finds root of the app
const container = document.getElementsByClassName('app-container')[0];

//Render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);