import { receiptEmail, payment, dbTransaction } from '../controllers/checkout';
import { sendCheckoutError } from '../services/mailjet';
import { textBody } from '../services/twilio/messages';
import TextAPI from '../services/twilio';

// Receives most order info
export const paymentHandler = async (req, res) => {
  try {
    const response = await payment(req.body);

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Receives all the order info
export const receiptEmailHandler = async (req, res) => {
  try {
    const response = await receiptEmail(req.body);

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Only receives phone number
export const textHandler = async (req, res) => {
  let firstName = '';
  if (req.body.name) {
    firstName = req.body.name.split(' ')[0];
  }
  try {
    const textResponse = await TextAPI(textBody.processed(firstName), req.body);
    res.status(200).json(textResponse);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Receives all the database entry information
export const dbTransactionHandler = async (req, res) => {
  try {
    const response = await dbTransaction(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

// Receives response to text, receipt, db, and the phone, email, and name
export const errorHandler = async (req, res) => {
  try {
    const response = await sendCheckoutError(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
