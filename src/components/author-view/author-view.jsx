import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

export class AuthorView extends React.Component{
    keypressCallback(event){
        console.log(event.key);
    }
    
    componentDidMount(){
        document.addEventListener('keypress', this.keypressCallback);
    }
    
    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypresssCallback);
    }

    render() {
        const { author, onBackClick } = this.props

        if(author.Death === null) {
            return(
                <div className="author-view">
                    <div className="book-author">
                        <span className="label">{author.Name}</span>
                    </div>
                    <div className="author-bio">
                        <span className="label">Bio: </span>
                        <span className="value">{author.Bio}</span>
                    </div>
                    <div className="author-birth">
                        <span className="label">Birthday: </span>
                        <span className="value">{author.Birth}</span>
                    </div>
                    
                    <Button id="author-button" onClick={() => { onBackClick(null); }}>Back</Button>
                </div>
            );
        } else {
            return(
                <div className="author-view">
                    <div className="book-author">
                        <span className="label">{author.Name}</span>
                    </div>
                    <div className="author-bio">
                        <span className="label">Bio: </span>
                        <span className="value">{author.Bio}</span>
                    </div>
                    <div className="author-birth">
                        <span className="label">Birthday: </span>
                        <span className="value">{author.Birth}</span>
                    </div>
            
                    <div className="author-death">
                        <span className="label">Death: </span>
                        <span className="value">{author.Death}</span>
                    </div>
                    
                    <Button id="author-button" onClick={() => { onBackClick(null); }}>Back</Button>
                </div>    
            );
        }
    }   
}

AuthorView.propTypes = {
    author: PropTypes.shape({
          Name: PropTypes.string.isRequired,
          Bio: PropTypes.string.isRequired,
          Birth: PropTypes.number.isRequired,
          Death: PropTypes.number
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
};