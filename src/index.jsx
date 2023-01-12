import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';

// Import index.scss
import './index.scss';

// Main component
class MyBooksApplication extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}

// Finds root of the app
const container = document.getElementsByClassName('app-container')[0];

//Render app in the root DOM element
ReactDOM.render(React.createElement(MyBooksApplication), container);