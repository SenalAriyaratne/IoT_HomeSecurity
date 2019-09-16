const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const base = `${__dirname}/public`;

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(`${base}/home.html`);
});

app.get('/devicelist', function (req, res) {
    res.sendFile(`${base}/devicelist.html.html`);
});

app.get('/registerdevice', function (req, res) {
    res.sendFile(`${base}/registerdevice.html`);
});

app.get('*', (req, res) => {
    res.sendFile(`${base}/404.html`);
   });

app.get('/home', (req, res) => {
    res.sendFile(`${base}/home.html`);
});

app.get('/aboutus', (req, res) => {
    res.sendFile(`${base}/aboutus.html`);
});

app.get('/gallery', (req, res) => {
    res.sendFile(`${base}/gallery.html`);
});

app.get('/loginn', (req, res) => {
    res.sendFile(`${base}/loginn.html`);
});

app.get('/register', (req, res) => {
    res.sendFile(`${base}/register.html`);
});
   
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});