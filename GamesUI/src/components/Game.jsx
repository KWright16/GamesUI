import React, { Component } from "react";
import { navigate } from "@reach/router";
import * as api from "../api";

class Game extends Component {
    state = {
        game: {},
        releaseDate: "",
        deleted: false,
        isLoading: true,
        rating: 0,
        empty: null,
        error: null
    }

    render() {
        const { game, releaseDate, isLoading, deleted, rating, empty, error } = this.state;
        const message = empty ? "Please complete all fields" : "";
        if(error) return (<p>Something went wrong</p>)
        if (isLoading) return (<div className="loader">...Loading</div>)
        if (!deleted) {
            return (
                <div className="game">
                    <h2>{game.name}</h2>
                    <div className="text">
                        <p>{`Release Date: ${releaseDate}`}</p>
                        <p>{`User Rating: ${game.rating}`}</p>
                        <p>{game.description}</p>                    
                    </div>
                    <div className="controls">
                        <label htmlFor="rating">Update Rating</label><br/>
                        <input id="rating" type="number" min="0" max="10" value={rating} onChange={this.handleChange} />
                        <button onClick={this.updateRating}>Update</button>
                        <button onClick={this.deleteGame}>Delete Game</button>
                        <p className="emptyField">{message}</p>
                    </div>
                </div>
            );
        } else {
            return (
                    <h2>Game Deleted</h2>                
            )
        }
        
    }
    componentDidMount() {
        const { gameId, exitLobby } = this.props;
        exitLobby();
        api
            .getGame(gameId)
            .then((game) => {
                const releaseDate = `${ game.releaseDate.substr(8, 2)
            }${ game.releaseDate.substr(4, 4) }${ game.releaseDate.substr(0, 4) }`
                this.setState({ game, releaseDate, isLoading: false })
            })
            .catch(err => {
                const { uri } = this.props;
                navigate("/error", {
                    replace: true,
                    state: {
                        code: err.response.status,
                        message: err.response.statusText,
                        from: uri
                    }
                });
            });
    }
    
    updateRating = () => {
        const { game, rating } = this.state;
        const empty = rating <= 0 || rating > 10;
        if (empty) {
            this.setState({ empty })
        } else {
            const updatedGame = { ...game, rating }
            api.updateRating(game.id, updatedGame)
                .then((game) => {
                    this.setState({ game: updatedGame, empty: null })
                })
                .catch(error => {
                    this.setState({error})
                })
        }
    }

    deleteGame = () => {
        const { game } = this.state;
        api.deleteGame(game.id)
        .then((game) => {
            this.setState({ deleted: true })
        })
        .catch(error => {
            this.setState({ error });
        })
    }
    handleChange = event => {
        const { id, value } = event.target;
        this.setState({
            [id]: value
        });
    };    
}

export default Game;