import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setBooks, setUser } from '../../actions/actions';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import BooksList from '../books-list/books-list';
//import { BookCard } from '../book-card/book-card';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { BookView } from '../book-view/book-view';
import { AuthorView } from '../author-view/author-view';
import { NavbarView } from '../navbar-view/navbar-view';
import { ProfileView } from '../profile-view/profile-view';

class MainView extends React.Component {
    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken != null) {
            const { setUser } = this.props;
            setUser(localStorage.getItem('user'));
            this.getBooks(accessToken);
        }
    }

    onLoggedIn(authData) {
        const { setUser } = this.props;
        setUser(authData.users.Username);
        console.log(authData);
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.users.Username);
        this.getBooks(authData.token);
    }

    getBooks(token) {
        axios.get('https://mighty-falls-90534.herokuapp.com/books', {
            headers: { Authorization: 'Bearer ' + token }
        }).then(response => {
            this.props.setBooks(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    render() {
        let { books, user } = this.props;

        return (
            <Container>
                <Router>
                    <NavbarView user={ user } />

                    <Row className="main-view justify-content-md-center">
                        <Route exact path="/" render={() => {
                            if (!user) return <Col md={6}>
                                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                            </Col>

                            if (books.length === 0) return <div className="main-view" />

                            return <BooksList books={books}/>
                            /*
                            return books.map(b => (
                                <Col md={3} key={b._id}>
                                    <BookCard book={b} />
                                </Col>
                            ))
                            */
                        }} />

                        <Route path="/register" render={() => {
                            if (user) return <Redirect to="/" />
                            return <Col md={6}>
                              <RegistrationView />
                            </Col>
                        }} />

                        <Route path="/books/:bookId" render={({ match, history }) => {
                            return <Col md={8}>
                                <BookView 
                                    book={books.find((b) => b._id === match.params.bookId)}
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        }} />

                        <Route path="/authors/:Name" render={({match, history }) => {
                            if (books.length === 0) return <div className="main-view" />
                            return <Col md={8}>
                                <AuthorView 
                                    author={books.find((b) => b.Author.Name === match.params.Name).Author}
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        }} />

                        <Route path={`/users/${user}`} render={({ history }) => {
                            return <Col>
                                <ProfileView
                                    user={user}
                                    book={books}
                                    onBackClick={() => history.goBack()}
                                />
                            </Col>
                        }} />
                    </Row>
                </Router>
            </Container>
        );        
    }
}

let mapStateToProps = state => {
    return {
        books: state.books,
        user: state.user
    }
}

export default connect(mapStateToProps, {setBooks, setUser}) (MainView);