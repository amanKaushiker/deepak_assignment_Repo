require('dotenv').config(); 
const Kafka = require('node-rdkafka');
const WebSocket = require('ws');

const binanceWebSocketURL = process.env.BITMEX_WEB_SOCKET_URL;

const producer = new Kafka.Producer({
    'metadata.broker.list': '3.133.74.32:9093', // Kafka broker address
    'queue.buffering.max.messages': 1000000,
});

producer.connect();

producer.on('ready', () => {
    console.log('Kafka producer connected');
});

// Function to subscribe to a stream and produce messages
function subscribeAndProduce() {
    const ws = new WebSocket(`${binanceWebSocketURL}`);

    ws.on('message', (data) => {
        producer.produce(
            'bitmex-kafka-topic-1', // Kafka topic
            null,
            Buffer.from(data.toString()),
            null,
            Date.now()
        );
    });

    ws.on('error', (error) => {
        console.error(`Error in stream:`, error);
    });
}

// Example: subscribe to a stream and produce messages
subscribeAndProduce(); 
