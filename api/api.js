const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

//mongo "mongodb+srv://homesec-bmvgg.mongodb.net/test" --username Senal96 --password test1234

const express = require('express');
const Device = require('./models/device'); 

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
  next();
});
 
app.get('/api/test', (req, res) => {
 res.send('The API is working!');
});
app.listen(port, () => {
 console.log(`listening on port ${port}`);
});

app.get('/api/device', (req, res) => {
    Device.find({}, (err, device) => {
    if (err == true) {
    return res.send(err);
    } else {
    return res.send(device);
    }
  });
});

app.post('/api/device', (req, res) => {
  const { device, sensor, status, sensorData } = req.body;
  const newDevice = new Device({
    device,
    sensor,
    status,
    sensorData
  });
  newDevice.save(err => {
    return err
    ? res.send(err)
    : res.send('successfully added device and data');
  });
});
 
   