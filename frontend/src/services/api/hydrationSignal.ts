import axios from "axios";
import { baseUrl } from "./index";

const api = axios.create({
    baseURL: `${baseUrl}/hydrationSignal`,
});


export const updateHydrationStatus = (requireHydration: boolean): void => {
    api.post(`/`, requireHydration);
    return;
};

export const fetchHydrationStatus = (userId: string): Promise<number> => {
    return api.get(`/${userId}`).then(res => res.data);
};