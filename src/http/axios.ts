import axios, { AxiosResponse } from "axios";

const ROOT: string = "https://61cfb80065c32600170c7fa8.mockapi.io/film";
async function get(): Promise<AxiosResponse> {
    return await axios.get(ROOT);
}

export { get };

