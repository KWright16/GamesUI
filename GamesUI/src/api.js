import axios from "axios";

const base_url = "https://localhost:44321/api";

export const getGames = async () => {
    const { data } = await axios.get(`${base_url}/games`);
    return  data;
};

export const getGame = async (game_id) => {
    const { data } = await axios.get(`${base_url}/games/${game_id}`);
    return data;
};