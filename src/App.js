import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { debounce } from 'lodash';
import './App.css';
import * as BooksAPI from './utils/BooksAPI';
import Shelf from './components/Shelf';
import SearchBooks from './components/SearchBooks';
class BookApp extends Component {
	state = {
		query: '',
		currentlyReading: [],
		wantToRead: [],
		read: [],
		searchResults: []
	};

	componentDidMount() {
		BooksAPI.update({ id: 'dummy' }, 'none')
			.then(shelvesObject => this.updateShelf(shelvesObject))
			.then(() => console.log('App: component did mount, book shelves were just updated.'))
			.catch(e => {
				console.log(e);
				return [];
			});
	}

	updateShelf = shelvesObject => {
		this.setState(shelvesObject);
		console.log('Books in the Shelf updated!');
	};

	updateQuery = query => {
		console.log(query);
		this.setState({ query: query });
	};
	render() {
		return (
			<div className="app">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books">
					<Route
						exact
						path="/search/"
						render={() => (
							<div>
								<SearchBooks query={this.state.query} updateQuery={this.updateQuery} updateShelf={this.updateShelf} />
								<div className="search-books-results">
									<Shelf
										ShelfName="Search Results"
										updateShelf={this.updateShelf}
										ThisShelf={this.state.searchResults}
									/>
								</div>
							</div>
						)}
					/>

					<Route
						path="/search/:urlQuery"
						render={({ match }) => (
							<div>
								<SearchBooks
									urlQuery={match.params.urlQuery}
									query={this.state.query}
									updateQuery={this.updateQuery}
									updateShelf={this.updateShelf}
								/>
								<div className="search-books-results">
									<Shelf
										ShelfName="Search Results"
										updateShelf={this.updateShelf}
										ThisShelf={this.state.searchResults}
									/>
								</div>
							</div>
						)}
					/>

					<Route
						exact
						path="/"
						render={() => (
							<div>
								<div className="list-books-content">
									<Shelf
										ShelfName="Currently Reading"
										updateShelf={this.updateShelf}
										ThisShelf={this.state.currentlyReading}
									/>
									<Shelf ShelfName="Want To Read" updateShelf={this.updateShelf} ThisShelf={this.state.wantToRead} />
									<Shelf ShelfName="Read" updateShelf={this.updateShelf} ThisShelf={this.state.read} />
								</div>

								<div className="open-search">
									<Link to={`/search/${this.state.query}`}>Add a book</Link>
								</div>
							</div>
						)}
					/>
				</div>
			</div>
		);
	}
}

export default BookApp;
