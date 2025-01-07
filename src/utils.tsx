import { AxiosError } from "axios";

export function reportAxiosError(err: AxiosError) {
    console.error(err);
}