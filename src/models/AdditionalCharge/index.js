import { Model } from 'objection';
// avoid circular import by using direct

export default class AdditionalCharge extends Model {
  static tableName = 'additional_charge';
}
