import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input'
import { BookCard } from '../book-card/book-card';

import './books-list.scss';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function BooksList(props) {
    const { books, visibilityFilter } = props;
    let filteredBooks = books;

    if (visibilityFilter !== '') {
        filteredBooks = books.filter(b => b.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!books) return <div className='main-view' />

    return <>
        <Col>
            <h2 id="app-title">Books</h2>
        </Col>
        <Col md={12}>
            <VisibilityFilterInput visibilityFilter={visibilityFilter} />
        </Col>
        {filteredBooks.map(b => (
            <Col md={3} key={b._id}>
                <BookCard book={b} />
            </Col>
        ))}
    </>;
}

export default connect(mapStateToProps)(BooksList);