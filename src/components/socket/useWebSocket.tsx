import { Client } from '@stomp/stompjs';

const useWebSocket = (onMessage: any) => {
    const client = new Client({
        brokerURL: 'ws://localhost:8088/ws',
        onConnect: () => {
            console.log('Connected to WebSocket');
            client.subscribe('/topic/alerts', (message: any) => {
                onMessage(message.body);
            });
        },
        onDisconnect: () => console.log('Disconnected from WebSocket'),
        debug: (str: any) => console.log(str),
    });

    const connect = () => {
        client.activate();
    };

    const disconnect = () => {
        client.deactivate();
    };

    return {connect, disconnect};
};

export default useWebSocket;