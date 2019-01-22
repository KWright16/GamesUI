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

export const addGame = async (game) => {
    console.log(game)
    const { data } = await axios.post(`${base_url}/games`, game);
    console.log(data);
    return data;
};

export const deleteGame = async (game_id) => {
    const { data } = await axios.delete(`${base_url}/games/${game_id}`);
    return data;
};

export const updateRating = async (game_id, game) => {
    const { data } = await axios.put(`${base_url}/games/${game_id}`, game);
    return data;
};
