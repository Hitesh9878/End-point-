# Callback Status Dashboard

A simple dashboard to receive and display Twilio call status callbacks.

## Setup
1. Create a new web service on Render
2. Set runtime to Node.js
3. Set build command: `npm install`
4. Set start command: `node server.js`
5. Get your public URL (will look like `https://your-app.onrender.com`)

## Usage
1. Configure your Twilio number with status callback:
   - Callback URL: `https://your-app.onrender.com/status-callback`
2. Make test calls
3. Visit `https://your-app.onrender.com` to see results

## Features
- Real-time callback receiving
- Status color coding
- Detailed call view
- Mobile responsive
