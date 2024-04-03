const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  brokers: ['3.133.74.32:9094'],
});

const admin = kafka.admin();

async function createTopic() {
  await admin.connect();
  await admin.createTopics({
    topics: [{
      topic: 'binance-kafka-topic-1',
      numPartitions: 1,
      replicationFactor: 1,
      configEntries: [
        { name: 'retention.ms', value: '1800000' } // Set retention period to 1/2 hour (1800000 milliseconds)
      ]
    }],
  });
  await admin.disconnect();
}

createTopic().then(() => console.log('Topic created successfully')).catch(console.error);
