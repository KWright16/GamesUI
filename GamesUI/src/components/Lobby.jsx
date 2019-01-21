import React, { Component } from "react";
import { Link } from "@reach/router";

class Lobby extends Component {
    state = {
        games: [],
    }

    render() {
        return (
            <div>
                <Link className="enterButton" to="/games">View, add and rate your favorite games</Link>
            </div>
        );
    }
}



export default Lobby;