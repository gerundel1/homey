const OrderModel = require('../model/order.model');
const UserModel = require('../model/user.model');
const createOrder = async (req, res) => {
    if(req.body.orderItems) {
        try {
            const user = await UserModel.findById(req.body.sellerId);
            const newOrder = await OrderModel.create({
                ...req.body,
                sellerEmail: user.email
            });
            res.status(201).json(newOrder);
        } catch (e) {
            res.status(400).json({error: e});
        }
    } else {
        res.status(400).json('Cannot create an order: order items do not exist');
    }
};

// Example of request url: http://localhost:8080/api/orders/get_all?user=john.smith@example.com&order=unitPrice&page=2
// Please note that pagination in this function starts from 0 (0 is 1 page)
// Limit is a field that limits the number of records in the returned array
// For sorting, you can pass 'desc' for descending and 'asc' for ascending (desc is default)
const getOrdersByCriteria = async (req, res) => {
    try {
        const orderBy = req.query.orderBy || 'total';
        const sort = req.query.sort || 'desc';
        const page = req.query.page || 0;
        const limit = req.query.limit || 20;
        const user = req.query.user;
        const seller = req.query.seller;
        const startDate = req.query.sdate;
        const endDate = req.query.edate;

        let criteria = {};
        if(user) {
            criteria['userEmail'] = user;
        }

        if(seller) {
            criteria['sellerEmail'] = seller;
        }

        if(startDate && endDate) {
            console.log(startDate, endDate);
            criteria['createdAt'] = {"$gte": startDate, "$lt": endDate};
        }

        let orderCondition = {};
        orderCondition[orderBy] = sort;

        const orders = await OrderModel.find(criteria).sort(orderCondition).skip(page * limit).limit(limit);
        res.status(200).json(orders);
    } catch (err) {
        res.status(400).json(`An error occured when retrieving the orders form db: ${err}`);
    }
}

module.exports = {
    createOrder,
    getOrdersByCriteria
}