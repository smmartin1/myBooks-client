import React, { Fragment } from 'react';
import axios from 'axios';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './profile-view.scss';

export function FavoriteBooks({ user, books, favoriteBooks }) {
    const bookList = books.filter(b => {
        return favoriteBooks.includes(b._id)
    })

    const removeFav = (bookId) => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        axios.delete(`https://mighty-falls-90534.herokuapp.com/users/${user}/books/${bookId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            alert('Book has been removed from favorites.');
            window.open(`/users/${user}`, '_self');
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Fragment>
            { bookList.length === 0
                ? (<p>Add your favorite books</p>)
                : bookList.map ((book) => {
                    return (
                        <Col xs={12} md={6} lg={4}>
                            <Card id="favorite-card">
                                <Card.Img className="favorite-poster" crossOrigin="anonymous" variant="top" src={book.ImagePath} />
                                <Card.Body>
                                    <Card.Title className="favorite-title">{book.Title}</Card.Title>

                                    <Link to={`/books/${book._id}`}>
                                        <Button id="favorite-btn" variant="primary">Open</Button>
                                    </Link>

                                    <Button variant="primary" id="remove-btn" onClick={() => {removeFav(book._id)}}>Remove</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })
            }
        </Fragment>
    )
}