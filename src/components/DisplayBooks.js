import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from '../utils/BooksAPI';

class DisplayBooks extends Component {
	state = {
		id: this.props.id,
		title: '',
		authors: [''],
		imageUrl: { smallThumbnail: '' },
		shelf: 'none'
	};

	componentDidMount() {
		BooksAPI.get(this.props.id).then(res => this.setState(res));
	}

	handleChange(event) {
		let createShelf = event.target.value;
		console.log(createShelf);
		let previousShelf = this.state.shelf;
		this.setState({ shelf: createShelf });
		BooksAPI.update({ id: this.state.id }, createShelf)
			.then(shelfObj => this.props.updateShelf(shelfObj))
			.catch(() => this.setState({ shelf: previousShelf }));
	}
	render() {
		return (
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						title={this.props.id}
						style={{
							width: 128,
							height: 192,
							backgroundImage: `url(${this.state.imageUrl.smallThumbnail})`
						}}
					/>

					<div className="book-shelf-changer">
						<form>
							<select value={this.state.shelf} onChange={this.handleChange}>
								<option disabled value="none">
									Move to...
								</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</form>
					</div>
				</div>
				<div className="book-title">{this.state.title}</div>
				<div className="book-authors">
					{this.state.authors && this.state.authors.map((author, index) => <p key={index}>{author}</p>)}
				</div>
			</div>
		);
	}
}

DisplayBooks.propTypes = {
	id: PropTypes.string.isRequired
};

export default DisplayBooks;
