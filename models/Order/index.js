import mongoose from 'mongoose';
import schema from './orderSchema';
import statusChange from './orderStatusChange';

const orderSchema = new mongoose.Schema(schema);

orderSchema.methods.changeStatus = statusChange;

export default mongoose.model('Order', orderSchema);
