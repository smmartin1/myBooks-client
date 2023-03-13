import { combineReducers } from 'redux';
import { SET_BOOKS, SET_FILTER, SET_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function books(state = [], action) {
    switch (action.type) {
        case SET_BOOKS:
            return action.value;
        default:
            return state;
    }
}

function user(state = '', action) {
    switch (action.type) {
        case SET_USER:
            return action.value;
        default:
            return state;
    }
}

const booksApp = combineReducers({
    visibilityFilter,
    books,
    user
});

export default booksApp;