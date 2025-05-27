import {io} from "socket.io-client";

const socket = io("http://localhost:3003");

export default socket;