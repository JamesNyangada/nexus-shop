export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
      { name: 'email', title: 'Email', type: 'string' },
      { name: 'amount', title: 'Amount', type: 'number' },
      { name: 'paymentStatus', title: 'Payment Status', type: 'string' },
      { name: 'reference', title: 'Transaction Reference', type: 'string' },
    ],
  };
  