import React, { Component } from "react";
import * as api from "../api";

class Game extends Component {
    state = {
        game: {},
        releaseDate: ""
    }

    render() {
        const { game, releaseDate } = this.state;
        return (
            <div>
                <h2>{game.name}</h2>
                <p>{`Release Date: ${releaseDate}`}</p>
                <p>{`User Rating: ${game.rating}`}</p>
                <p>{game.description}</p>
            </div>
        );
    }
    componentDidMount() {
        const { gameId } = this.props;
        api
            .getGame(gameId)
            .then((game) => {
                console.log(game)
                const releaseDate = `${ game.releaseDate.substr(8, 2)
            }${ game.releaseDate.substr(4, 4) }${ game.releaseDate.substr(0, 4) }`
                this.setState({ game, releaseDate })
            })
            .catch(err => {
                console.log(err)
            });
    }
}

export default Game;