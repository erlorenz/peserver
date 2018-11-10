const statusList = [
  'pickedUp',
  'checkedIn',
  'outForDelivery',
  'completed',
  'exception',
  'refunded',
  'cancelled',
];

export default function(status) {
  // Validate status
  if (!statusList.includes(status)) throw new Error('Status invalid');

  // Set active status
  this.status = status;

  // Set timestamp for status change
  this[status] = Date.now();

  return { newStatus: this.status, timeStamp: this[status] };
}
