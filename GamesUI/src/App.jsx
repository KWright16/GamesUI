import React, { Component } from 'react';
import './App.css';
import './spinner.css'
import { Router, Link } from "@reach/router";
import Home from './components/Home';
import Game from './components/Game';
import AddGame from './components/AddGame';
import Lobby from './components/Lobby';

class App extends Component {
    state = {
        lobby: true
    }
    render() {
        const { lobby } = this.state;
        return (
            <div className={lobby? "App-Lobby": "App"}>
                <header>
                    <h1>The Games Archive</h1>
                </header>
                <nav className={lobby ? "No-Nav" : "Nav"}>
                    <Link to="/games">View Games</Link>
                    <Link to="/games/new_game">Add a Game</Link>
                </nav>
                <Router className={lobby ? "Main-Lobby" : "Main"}>
                    <Lobby path="/" />
                    <Home exitLobby={this.exitLobby} path="/games" />
                    <Game exitLobby={this.exitLobby} path="/games/:gameId" />
                    <AddGame exitLobby={this.exitLobby} path="/games/new_game" />
                </Router>
            </div>
        );
    }
    exitLobby = () => {
        this.setState({lobby: false})
    }    
}

export default App;
