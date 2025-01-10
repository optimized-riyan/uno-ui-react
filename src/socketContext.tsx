import { createContext } from "react";
import { ClientAction } from "./types";

export const SocketContext = createContext<((action: ClientAction) => void)|null>(null);
