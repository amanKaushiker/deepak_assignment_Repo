const Kafka = require('node-rdkafka');
const {connectToDatabase} = require("../DB/connection");
const {perMinuteCalculator} = require("../Services/perMinuteCalculation.service");
const {FiveMinuteCalculator} = require("../Services/fiveMinuteCalculation.service");
const {FifteenMinuteCalculator} = require("../Services/fifteenMinuteCalculation.service");
const {PerHourCalculator} = require("../Services/perHourCalculation.service");
const {FourHourCalculator} = require("../Services/fourHourCalculation.service");
const {DayDataCalculator} = require("../Services/perDayCalculation.service");

const {allTimeFrameCalculation} = require("../Services/allTimeframeCalculation.service");


const group = process.argv[2];

// connect to database
connectToDatabase();

const consumerConfig = {
  'group.id': group,
  'metadata.broker.list': '3.133.74.32:9094', // Kafka broker address
  'auto.offset.reset': 'earliest', // Start consuming from the earliest message in the topic
};

const consumer = new Kafka.KafkaConsumer(consumerConfig);

consumer.on('ready', async () => {
  console.log('Consumer is ready');
  consumer.subscribe(['binance-kafka-topic-1']);

  consumer.consume();
});

consumer.on('data', (message) => {
  const messageObject = JSON.parse(message.value);

  // Accessing fields of the 'data' object
  const data = [messageObject.data];

  // call function for per minute calculation
  // perMinuteCalculator(data);

  // call function for per five minute calculation
  // FiveMinuteCalculator(data);

  // call function for per fifteen minute calculation
  // FifteenMinuteCalculator(data);

  // call function for per fifteen minute calculation
  // PerHourCalculator(data);

  // call function for per fifteen minute calculation
  // FourHourCalculator(data);
  
  // call function for per fifteen minute calculation
  // DayDataCalculator(data);

  // call function for per fifteen minute calculation
  allTimeFrameCalculation(data);
  
  
});

consumer.on('event.error', (error) => {
  console.error('Consumer error:', error);
});

consumer.connect();
