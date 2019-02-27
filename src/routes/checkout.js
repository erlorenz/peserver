import { emailAndText, payment, dbTransaction } from '../controllers/checkout';
import { sendCheckoutError } from '../services/mailjet';

export const paymentHandler = async (req, res) => {
  try {
    const response = await payment(req.body);

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ error: 'payment', message: e.message });
  }
};

export const emailAndTextHandler = async (req, res) => {
  try {
    const response = await emailAndText(req.body);

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ error: 'emailAndText', message: e.message });
  }
};

export const dbTransactionHandler = async (req, res) => {
  try {
    const response = await dbTransaction(req.body);

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ error: 'database', message: e.message });
  }
};

export const errorHandler = async (req, res) => {
  try {
    const response = await sendCheckoutError(req.body);

    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ error: 'database', message: e.message });
  }
};
