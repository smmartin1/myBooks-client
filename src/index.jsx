import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import booksApp from './reducers/reducers';
import MainView from './components/main-view/main-view';

const store = createStore(booksApp);

// Main component
class MyBooksApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container className="app">
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds root of the app
const container = document.getElementsByClassName('app-container')[0];

//Render app in the root DOM element
ReactDOM.render(React.createElement(MyBooksApplication), container);