require('dotenv').config(); 
const WebSocket = require('ws');

// Binance WebSocket URL
console.log(process.env.BINANCE_WEB_SOCKET_URL);
const binanceWebSocketURL = process.env.BINANCE_WEB_SOCKET_URL;

// Function to subscribe to a stream
function subscribeToStream(streamName) {
    const ws = new WebSocket(`${binanceWebSocketURL}/${streamName}`);
    
    // Event: when connection is established
    ws.on('open', () => {
        console.log(`Connected to ${streamName} stream`);
    });

    // Event: when a message is received
    ws.on('message', (data) => {
        console.log(`Received data from ${streamName}:`);
        console.log(JSON.parse(data));
    });

    // Event: when an error occurs
    ws.on('error', (error) => {
        console.error(`Error in ${streamName} stream:`, error);
    });

    // Event: when connection is closed
    ws.on('close', () => {
        console.log(`Connection to ${streamName} closed`);
    });
}

// Example: subscribe to a stream
subscribeToStream('btcusdt@trade'); // Example stream: trades for BTC/USDT pair
