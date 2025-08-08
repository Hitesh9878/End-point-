import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
let callLogs = [];

app.post('/api/call-status', (req, res) => {
  const { CallSid, Status, RecordingUrl, DateUpdated } = req.body;
  if (!CallSid || !Status || !DateUpdated) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const entry = { CallSid, Status, RecordingUrl, DateUpdated };
  callLogs.push(entry);
  res.status(200).json({ message: 'Stored successfully' });
});

app.get('/api/call-status', (req, res) => {
  res.status(200).json(callLogs);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
