import axios from "axios";
import { baseUrl } from "./index";

const api = axios.create({
    baseURL: `${baseUrl}/hydrationSignal`,
});


export const updateHydrationStatus = (requireHydration: boolean): void => {
    api.post(`/`, requireHydration);
    return;
};

export const fetchHydrationStatus = (): Promise<boolean> => {
    return axios.get('/api/hydration').then(res => res.data);
};