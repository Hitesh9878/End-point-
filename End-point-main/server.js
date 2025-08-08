const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

let callRecords = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.post('/status-callback', (req, res) => {
  const { CallSid, Status, RecordingUrl, DateUpdated } = req.body;

  const newRecord = {
    id: CallSid,
    status: Status,
    recording: RecordingUrl || 'N/A',
    timestamp: DateUpdated ? new Date(DateUpdated).toLocaleString() : new Date().toLocaleString(),
    received: new Date().toLocaleString()
  };

  callRecords.unshift(newRecord);
  console.log('Received callback:', newRecord);
  res.status(200).send('Callback received');
});

app.get('/', (req, res) => {
  res.render('index', { records: callRecords });
});

app.get('/details/:id', (req, res) => {
  const record = callRecords.find(r => r.id === req.params.id);
  res.render('details', { record });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});