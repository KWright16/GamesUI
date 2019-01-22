import React, { Component } from "react";
import * as api from "../api";

class AddGame extends Component {
    state = {
        name: "",
        releaseDate: "",
        rating: 0,
        description: "",
        posted: false,
        game: {},
        empty: null,
        error: null
    }

    render() {
        const { name, releaseDate, rating, description, posted, game, empty, error } = this.state;   
        const message = posted ? `You succesfully added ${game.name}` : empty ? "Please complete all fields" : "";
        if (error) return (<p>Something went wrong</p>);
        return (
            <div className="addGame">
                <h2>Add a Game</h2>
                <p className={empty? "emptyField": ""}>{message}</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Game Name: </label>
                    <br />
                    <input                        
                        type="text"
                        id="name"
                        value={name}
                        onChange={this.handleChange}
                        placeholder="Game name ..."
                    />
                    <br />

                    <label htmlFor="releaseDate">Release Date: </label>
                    <br />
                    <input
                        type="date"
                        id="releaseDate"
                        value={releaseDate}
                        onChange={this.handleChange}
                    />
                    <br />

                    <label htmlFor="rating">Rating (between 1 and 10): </label>
                    <br />
                    <input
                        type="number"
                        max="10"
                        min="0"
                        id="rating"
                        value={rating}
                        onChange={this.handleChange}
                    />
                    <br />
                    <label htmlFor="description">Description: </label>
                    <br />
                    <textarea
                        id="description"
                        value={description}
                        onChange={this.handleChange}
                        placeholder="Description..."
                    />
                    <br />
                    <button>Add Game</button>
                </form>
            </div>
        );
    }

    componentDidMount() {
        const { exitLobby } = this.props;
        exitLobby();
    }
    handleChange = event => {
        const { id, value } = event.target;
        this.setState({
            [id]: value
        });
    };
    handleSubmit = event => {
        event.preventDefault();
        const { name, releaseDate, rating, description } = this.state;
        const date = `${releaseDate}T00:00: 00`;
        const empty = this.validate(name, releaseDate, rating, description);
        if (empty.name || empty.releaseDate || empty.rating || empty.description) {
            this.setState({ empty, posted: false })
        } else {

        const newGame = {
            name,
            date,
            rating,
            description
        };
        api.addGame(newGame)
            .then((game) => {
                this.setState({
                    posted: true,
                    game,
                    name: "",
                    description: "",
                    releaseDate: "",
                    rating: 0,
                    empty: null
                })
            })
            .catch((error) => {
                this.setState({error})
            })
        }
    }
    validate = (name, releaseDate, rating, description) => {
        return {
            name: name.length === 0,
            releaseDate: releaseDate.length === 0,
            rating: rating <= 0 || rating > 10,
            description: description.length === 0
        };
    };
}

export default AddGame;