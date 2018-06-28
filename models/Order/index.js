import mongoose from 'mongoose';
import orderSchema from './orderSchema';

export default mongoose.model('Order', new mongoose.Schema(orderSchema));
