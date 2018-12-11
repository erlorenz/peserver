import mongoose from 'mongoose';
import schema from './orderSchema';
import statusChange from './orderStatusChange';
import orderCreateNew from './orderCreateNew';

const orderSchema = new mongoose.Schema(schema);

orderSchema.methods.changeStatus = statusChange;

orderSchema.statics.createNew = orderCreateNew;

export default mongoose.model('Order', orderSchema);
