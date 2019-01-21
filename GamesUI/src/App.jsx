import React, { Component } from 'react';
import './App.css';
import { Router } from "@reach/router";
import Home from './components/Home';
import Game from './components/Game';
import AddGame from './components/AddGame';
import Lobby from './components/Lobby';

class App extends Component {
    state = {
        lobby: true
    }
    render() {
        return (
            <div className="App">
                <header>
                    <h1>The Games Archive</h1>
                </header>
                <nav className="Nav">
                </nav>
                <Router className="main">
                    <Lobby path="/" />
                    <Home path="/games" />
                    <Game path="/games/:gameId" />
                    <AddGame path="/games/new_game" />
                </Router>
            </div>
        );
    }
}

export default App;
