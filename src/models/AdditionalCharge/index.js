import { Model } from 'objection';

export default class AdditionalCharge extends Model {
  static get tableName() {
    return 'additional_charges';
  }
}
