import axios from "axios";
import { createServerFn } from "@tanstack/react-start";

type CountryNamesResponse = Record<string, string>;

export const getCountries = createServerFn({ method: "GET" }).handler(async () => {
    const { data } = await axios.get<CountryNamesResponse>("https://country.io/names.json");

    return Object.entries(data).map(([code, name]) => ({
        code,
        name,
    }));
});
