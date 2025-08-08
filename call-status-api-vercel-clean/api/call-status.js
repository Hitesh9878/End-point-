import express from 'express';
import serverless from 'serverless-http';

const app = express();
app.use(express.json());

let callLogs = [];

app.post('/api/call-status', (req, res) => {
  const { CallSid, Status, RecordingUrl, DateUpdated } = req.body;

  if (!CallSid || !Status || !DateUpdated) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const entry = { CallSid, Status, RecordingUrl, DateUpdated };
  callLogs.push(entry);
  console.log('Stored:', entry);

  res.status(200).json({ message: 'Stored successfully' });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/call-status', (req, res) => {
  res.status(200).json(callLogs);
});

export default serverless(app);
