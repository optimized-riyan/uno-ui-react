import { AxiosError } from "axios";

export default function reportAxiosError(err: AxiosError) {
    console.error(err);
}