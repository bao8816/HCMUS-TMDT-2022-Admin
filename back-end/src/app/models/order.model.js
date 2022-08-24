const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Order = new Schema({
    email: {
        type: String, 
        required: true,
        ref: 'Customer_account'
    },
    products: [
        {
            product_id: {
                type: String, 
                required: true, 
                ref: 'Product'
            },
            quantity: {
                type: Number, 
                required: true
            },
        }
    ],
    total: { 
        type: Number 
    },
    status: { 
        type: String, 
        require: true 
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    updatedAt: {
        type: Date, 
        default: Date.now
    },
    }
);

Order.pre('save', function() {
    this.total = this.products.reduce((acc, cur) => {
        return acc + cur.product_id.price * cur.quantity;
    } , 0);
})

Order.pre('update', function() {
    this.total = this.products.reduce((acc, cur) => {
        return acc + cur.product_id.price * cur.quantity;
    } , 0);
})

module.exports = mongoose.model('Order', Order);
 