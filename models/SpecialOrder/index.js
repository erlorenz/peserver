import mongoose from 'mongoose';
import schema from './SpecialOrderSchema';
import statusChange from './specialOrderStatusChange';

const specialOrderSchema = new mongoose.Schema(schema);

specialOrderSchema.methods.changeStatus = statusChange;

export default mongoose.model('SpecialOrder', specialOrderSchema);
