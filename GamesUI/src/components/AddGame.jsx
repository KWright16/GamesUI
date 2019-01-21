import React, { Component } from "react";
import * as api from "../api";

class AddGame extends Component {
    state = {
        games: [],
    }

    render() {
        return (
            <div>
                <h2>View, add and rate your favorite games</h2>
            </div>
        );
    }
}

export default AddGame;