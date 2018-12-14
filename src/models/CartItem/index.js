import { Model } from 'objection';

export default class CartItem extends Model {
  static get tableName() {
    return 'cart_items';
  }
}
