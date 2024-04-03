const Kafka = require('node-rdkafka');
const {connectToDatabase} = require("../DB/connection");

const {allTimeFrameCalculation} = require("../Services/allTimeframeCalculation.service");


const group = process.argv[2];

// connect to database
connectToDatabase();

const consumerConfig = {
  'group.id': group,
  'metadata.broker.list': '3.133.74.32:9093', // Kafka broker address
  'auto.offset.reset': 'latest', // Start consuming from the latest message in the topic
};

const consumer = new Kafka.KafkaConsumer(consumerConfig);

consumer.on('ready', async () => {
  console.log('Consumer is ready');
  consumer.subscribe(['bitmex-kafka-topic-1']);

  consumer.consume();
});

consumer.on('data', (message) => {
  const messageObject = JSON.parse(message.value);

  // Accessing fields of the 'data' object
  const data = messageObject.data;
  const modifiedData = [];
  
  if(data !== undefined){
    for(let elem of data){
        elem.T = new Date(elem.timestamp).getTime();
        elem.p = elem.price;
        modifiedData.push(elem);
    }
  }

  // call function for per fifteen minute calculation
  allTimeFrameCalculation(modifiedData);
  
  
});

consumer.on('event.error', (error) => {
  console.error('Consumer error:', error);
});

consumer.connect();
