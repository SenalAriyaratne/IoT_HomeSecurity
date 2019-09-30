
const mqtt = require('mqtt');
const mongoose = require('mongoose');
const Device = require('./Modelss/Device');


//mongoose.connect("")
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const port = process.env.PORT || 5001;

const port = 5001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

MONGO_URL="mongodb+srv://Senal96:test1234@homesec-bmvgg.mongodb.net/test"
URL = "mqtt://soldier.cloudmqtt.com:12700"
USERNAME = "kfhhporu"
PASSWORD = "QCKNT-D6Yd5o"
const client = mqtt.connect(URL, {
    username: USERNAME,
    password: PASSWORD
});
mongoose.connect(MONGO_URL);
client.on('connect', () => {
    client.subscribe('/sensorData'); //to subscribe
    console.log('connected');
});

client.on('message', (topic, message) => {
    if (topic == '/sensorData') {
        const data = JSON.parse(message);

        Device.findOne({ "device": data }, (err, device) => {
            if (err) {
                console.log(err)
            }

            Device.sensorData.push(data);
            const { sensorData } = device;
            const { loc} = data;
            sensorData.push({  loc });
            device.sensorData = sensorData;
            device.save(err => {
                if (err) {
                    console.log(err)
                }
            });
        });
    }
});

/*
app.post('/send-command', (req, res) => {
        const { deviceId, command } = req.body;
        const topic = `/command/${deviceId}`;
        client.publish(topic, command, () => {
            res.send('published new message');
            });
        });
    

        app.listen(port, () => {
            console.log(`listening on port ${port}`);
});*/
/*
const topic = '/test/hello/';
const msg = 'Hello MQTT world!';
client.publish(topic, msg, () => {
    console.log('message sent...');
});*/
