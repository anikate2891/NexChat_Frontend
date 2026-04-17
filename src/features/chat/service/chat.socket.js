import {io} from 'socket.io-client';

export const initializeSocketConnection = () => {
    const socket = io('https://nexchat-backend-9lgs.onrender.com', {
        withCredentials: true,
})
    socket.on('connect', () => {
        console.log('Connected to Socket.io server');
    })

    socket.on('disconnect', () => {
        console.log('Disconnected from Socket.io server');
    })
}