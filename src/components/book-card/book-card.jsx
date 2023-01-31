import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export function BookCard({ book }) {
    return (
        <Card className="book-card">
            <Card.Img crossOrigin="anonymous" variant="top" src={book.ImagePath} />
            <Card.Body className="book-body">
                <Card.Title className="card-title">{book.Title}</Card.Title>
                <Link to={`/books/${book._id}`}>
                    <Button id="book-btn" variant="primary">Open</Button>
                </Link>
                
            </Card.Body>
        </Card>
    );
}

BookCard.propTypes = {
    book: PropTypes.shape({
        Title: PropTypes.string.isRequired
    }).isRequired
};