import { receiptEmail, payment, dbTransaction } from '../controllers/checkout';
import { sendCheckoutError } from '../services/mailjet';
import { textBody } from '../services/twilio/messages';
import TextAPI from '../services/twilio';
import { Router } from 'express';

const router = Router();

// Receives most order info

router.post('/payment', async (req, res) => {
  try {
    const response = await payment(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// Receives all the order info
router.post('/receipt', async (req, res) => {
  try {
    const response = await receiptEmail(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// Only receives phone number
router.post('/text', async (req, res) => {
  let firstName = '';
  if (req.body.name) {
    firstName = req.body.name.split(' ')[0];
  }
  try {
    const textResponse = await TextAPI(
      textBody.processed(firstName),
      req.body.phone,
    );
    res.status(200).json(textResponse);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// Receives all the database entry information
router.post('/dbtransaction', async (req, res) => {
  try {
    const response = await dbTransaction(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

// Receives response to text, receipt, db, and the phone, email, and name
router.post('/error', async (req, res) => {
  try {
    const response = await sendCheckoutError(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

export default router;
