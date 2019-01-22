import React, { Component } from "react";
import * as api from "../api";

class Game extends Component {
    state = {
        game: {},
        releaseDate: "",
        deleted: false,
        isLoading: true,
    }

    render() {
        const { game, releaseDate, isLoading, deleted } = this.state;
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
                        <label htmlFor="update">Update Rating</label><br/>
                        <input id="update" type="number" value={game.rating} max="10" onChange={this.handleChange} />
                        <button onClick={this.updateRating}>Update</button>
                        <button onClick={this.deleteGame}>Delete Game</button>
                    </div>
                </div>
            );
        } else {
            return (
                <p>Game Deleted</p> 
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
                console.log(err)
            });
    }
    updateRating = () => {
        const { game, rating } = this.state;
        const updatedGame = { ...game, rating }
        console.log(updatedGame)
        api.updateRating(game.id, updatedGame)
        .then((game) => {
                this.setState({ game })
        })
        .catch(err => {
                console.log(err)
        })
    }

    deleteGame = () => {
        const { game } = this.state;
        api.deleteGame(game.id)
        .then((game) => {
                this.setState({ deleted: true })
        })
        .catch(err => {
                console.log(err);
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