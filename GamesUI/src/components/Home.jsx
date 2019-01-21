import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";

class Home extends Component {
    state = {
        games: [],
        lobby: false
    }

    render() {
        const { games } = this.state
        return (
            <div className="mainPages">
                <ul>
                    {games.map(game => {
                        return (
                            <li key={game.id}>
                                <Link to={`/games/${game.id}`}>{game.name}</Link>
                                <p>{`${game.releaseDate.substr(8, 2)}${game.releaseDate.substr(4, 4)}${game.releaseDate.substr(0, 4)}`}</p>
                                <p>{game.rating}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
    componentDidMount() {
        api
            .getGames()
            .then(( games ) => {               
                this.setState({games})
            })
            .catch(err => {
                console.log(err)
            });
    }

}



export default Home;