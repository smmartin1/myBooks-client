import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class BookView extends React.Component {
    constructor() {
        super();
        this.state = {
            FavoriteBooks: []
        };
    }

    keypressCallback = (event) => {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypresssCallback);
    }

    addFav = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const favBook = this.state.FavoriteBooks;
        let isFav = favBook.includes(this.props.book._id);

        if (!isFav) {
            axios.post(`https://mighty-falls-90534.herokuapp.com/users/${user}/books/${this.props.book._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
                alert('Book has been added to favorites.');
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    removeFav = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const favBook = this.state.FavoriteBooks;
        let isFav = favBook.includes(this.props.book._id);

        if (!isFav) {
            axios.delete(`https://mighty-falls-90534.herokuapp.com/users/${user}/books/${this.props.book._id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => {
                alert('Book has been remove from favorites.');
                console.log(response.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    render() {
        const {book, onBackClick} = this.props;
        const { FavortieBooks } = this.state;
        const favBook = this.state.FavoriteBooks;
        let isFav = favBook.includes(this.props.book._id);

        if (!book.Synopsis.Paragraph2) {
            return(
                <div className="book-view">
                    <div className="book-poster">
                        <img crossOrigin="anonymous" src={book.ImagePath} />
                    </div>
                    <div className="book-title">
                        <h2>{book.Title}</h2>
                    </div>
                    <div className="book-description">
                        <span className="label">Synopsis: </span>
                        <p className="value">{book.Synopsis.Paragraph1}</p>
                    </div>
                    <div className="book-genre">
                        <p>Published: {book.Published}</p>
                    </div>
                    <div className="book-genre">
                        <p>Genre: {book.Genre}</p>
                    </div>
                    <div className="book-Author">
                        <p>
                            Author: <Link to={`/authors/${book.Author.Name}`}>
                                <Button variant="link">{book.Author.Name}</Button>
                            </Link>
                        </p>
                    </div>

                    {!isFav && (
                        <Button id="add-button" onClick={this.addFav}>Add to Favorites</Button>
                    )}
                    {isFav && (
                        <Button id="remove-button" onClick={this.removeFav}>Remove from Favorites</Button>
                    )}

                    <Button onClick={() => { onBackClick(null); }}>Back</Button>
                </div>
            );
        } else {
            return(
                <div className="book-view">
                    <div className="book-poster">
                        <img crossOrigin="anonymous" src={book.ImagePath} />
                    </div>
                    <div className="book-title">
                        <h2>{book.Title}</h2>
                    </div>
                    <div className="book-description">
                        <span className="label">Synopsis: </span>
                        <p className="value">{book.Synopsis.Paragraph1}</p>
                        <p className="value">{book.Synopsis.Paragraph2}</p> 
                    </div>            
                    <div className="book-genre">
                        <p>Published: {book.Published}</p>
                    </div>
                    <div className="book-genre">
                        <p>Genre: {book.Genre}</p>
                    </div>
                    <div className="book-Author">
                        <p>
                            Author: <Link to={`/authors/${book.Author.Name}`}>
                                {book.Author.Name}
                            </Link>
                        </p>
                    </div>

                    {!isFav && (
                        <Button id="add-button" onClick={this.addFav}>Add to Favorites</Button>
                    )}
                    {isFav && (
                        <Button id="remove-button" onClick={this.removeFav}>Remove from Favorites</Button>
                    )}

                    <Button onClick={() => { onBackClick(null); }}>Back</Button>
                </div>
            );
        }
    }
}

BookView.propTypes = {
    book: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Synopsis: PropTypes.shape({
            Paragraph1: PropTypes.string.isRequired,
            Paragraph2: PropTypes.string
        }).isRequired,
        Genre: PropTypes.string.isRequired,
        Published: PropTypes.number.isRequired,
        Author: PropTypes.shape({
            Name: PropTypes.string.isRequired
        })
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};