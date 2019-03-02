import { Router } from 'express';
import twilio from 'twilio';

const router = Router();

// Send an autoresponse text if they text back
router.post('/notifications/sms', (req, res) => {
  const twiml = new twilio.twiml.MessagingResponse();

  twiml.message(
    'These notifications are auto-generated. Please call 702-620-3315 or email support@pressexpresslv.com if you need to contact us.',
  );

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
});

// Forward call to office phone if they call
router.post('/notifications/voice', (request, response) => {
  const twiml = new twilio.twiml.VoiceResponse();

  twiml.say({ voice: 'alice' }, 'Forwarding now!');
  twiml.dial('702-620-3315');

  // Render the response as XML in reply to the webhook request
  response.type('text/xml');
  response.send(twiml.toString());
});

export default router;
