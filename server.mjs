import express from 'express';
import fetch from 'node-fetch';
const app = express();
const PORT = 3000;

app.use(async (req, res) => {

  // Always force HTTPS and correct host
  const target = 'https://nathanlobo.byethost4.com' + req.originalUrl;

  const originResponse = await fetch(target, {
    method: req.method,
    redirect: 'follow',
    headers: {
      // forward browser cookies to byethost
      'cookie': req.headers.cookie || '',

      // disguise as real browser
      'user-agent': req.headers['user-agent'] || 'Mozilla/5.0',

      // prevent cookie challenge page
      'host': 'nathanlobo.byethost4.com'
    }
  });

  // Copy ALL headers except the frame-blockers
  originResponse.headers.forEach((value, key) => {
    const k = key.toLowerCase();
    if (k === 'x-frame-options' || k === 'frame-options' || k === 'content-security-policy') return;
    res.setHeader(key, value);
  });

  // Force allow iframing
  res.setHeader('Content-Security-Policy', 'frame-ancestors *');

  const body = await originResponse.buffer();
  res.status(originResponse.status).send(body);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});