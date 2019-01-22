import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import * as api from "../api";

class Home extends Component {
    state = {
        games: [],
        isLoading: true
    }

    render() {
        const { games, isLoading } = this.state;
        if (isLoading) return <div className="loader">Loading...</div>;
        return (
            <div className="home">
                <ul>
                    {games.map(game => {
                        return (
                            <li key={game.id}>
                                <Link to={`/games/${game.id}`}>{game.name}</Link>                                
                                <p>{`Release Date: ${game.releaseDate.substr(8, 2)}${game.releaseDate.substr(4, 4)}${game.releaseDate.substr(0, 4)}`}</p>
                                <p>{`User Rating: ${game.rating}`}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
    componentDidMount() {
        const { exitLobby } = this.props;
        exitLobby();
        api
            .getGames()
            .then(( games ) => {               
                this.setState({games, isLoading: false})
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

}



export default Home;