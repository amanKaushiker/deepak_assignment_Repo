require('dotenv').config(); 
const Kafka = require('node-rdkafka');
const WebSocket = require('ws');

const binanceWebSocketURL = process.env.BINANCE_WEB_SOCKET_URL;

const producer = new Kafka.Producer({
    'metadata.broker.list': '3.133.74.32:9094', // Kafka broker address
    'queue.buffering.max.messages': 1000000,
});

producer.connect();

producer.on('ready', () => {
    console.log('Kafka producer connected');
});

// Function to subscribe to a stream and produce messages
function subscribeAndProduce(streamName) {
    const ws = new WebSocket(`${binanceWebSocketURL}/${streamName}`);

    // Event: when connection is established
    ws.on('open', () => {
        console.log(`Connected to ${streamName} stream`);
    });

    ws.on('message', (data) => {
        producer.produce(
            'binance-kafka-topic-1', // Kafka topic
            null,
            Buffer.from(data.toString()),
            null,
            Date.now()
        );
    });

    ws.on('error', (error) => {
        console.error(`Error in ${streamName} stream:`, error);
    });
}

// Example: subscribe to a stream and produce messages
subscribeAndProduce('btcusdt@trade'); // Example stream: trades for BTC/USDT pair
