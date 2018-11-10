import mongoose from 'mongoose';
import schema from './orderSchema';
import statusChange from './statusChange';

const orderSchema = new mongoose.Schema(schema);

orderSchema.methods.changeStatus = statusChange;

export default mongoose.model('Order', orderSchema);
