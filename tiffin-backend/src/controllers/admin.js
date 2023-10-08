import moment from 'moment';
import Order from '../models/order.js';
import ExcelJS from 'exceljs'
import User from '../models/user.js';

async function getOrders(req, res){
    let query = {};
    let date = null;
    let startDate = null;
    let endDate = null;

    if (req.body.date) date = new Date(req.body.date);
    if (date){
        query = {
            createdAt: {
                $gte: moment(date).startOf('day').toDate(),
                $lte: moment(date).endOf('day').toDate()
            }
        };
    }

    if (req.body.startDate) startDate = new Date(req.body.startDate);
    if (req.body.endDate) endDate = new Date(req.body.endDate);
    if (startDate && endDate){
        query = {
            createdAt: {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate()
            }
        };
    }
    else if (startDate){
        query = {
            createdAt: {
                $gte: moment(startDate).startOf('day').toDate()
            }
        };
    }
    else if (endDate){
        query = {
            createdAt: {
                $lte: moment(endDate).endOf('day').toDate()
            }
        };
    }

    try {
        let orders = await Order.find(query).populate('meals.products.product');
        if (!orders){
            return res.status(404).json({ error: `no orders found` })
        }

        return res.status(200).json({ orders });
    }
    catch (err){
        console.log(err);
    }
}

async function exportOrders(req, res){
    let query = {};
    let date = null;
    let startDate = null;
    let endDate = null;

    if (req.body.date) date = new Date(req.body.date);
    if (date){
        query = {
            createdAt: {
                $gte: moment(date).startOf('day').toDate(),
                $lte: moment(date).endOf('day').toDate()
            }
        };
    }

    if (req.body.startDate) startDate = new Date(req.body.startDate);
    if (req.body.endDate) endDate = new Date(req.body.endDate);
    if (startDate && endDate){
        query = {
            createdAt: {
                $gte: moment(startDate).startOf('day').toDate(),
                $lte: moment(endDate).endOf('day').toDate()
            }
        };
    }
    else if (startDate){
        query = {
            createdAt: {
                $gte: moment(startDate).startOf('day').toDate()
            }
        };
    }
    else if (endDate){
        query = {
            createdAt: {
                $lte: moment(endDate).endOf('day').toDate()
            }
        };
    }

    try {
        let orders = await Order.find(query).populate('meals.products.product');
        if (!orders){
            return res.status(404).json({ error: `no orders found` })
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Orders');

        worksheet.addRow(['Order ID', 'Email', 'Phone Number', 'Name', 'Amount', 'Delivery Address', 'Order Placed At', 'Meals']);

        orders.forEach(order => {

            let data = [];

            data.push(order._id);
            data.push(order.userInfo.email);
            data.push(order.userInfo.phone);
            data.push(order.userInfo.name);
            data.push(order.amount);
            
            const deliveryAddress = `${order.deliveryAddress.streetAddress}, ${order.deliveryAddress.city}, ${order.deliveryAddress.state}, ${order.deliveryAddress.pincode}`;
            data.push(deliveryAddress);

            data.push(order.createdAt);

            order.meals.forEach(meal =>{
                const deliveryDate = meal.deliveryDate.toDateString();
                const products = meal.products.map(product => `${product.quantity}x ${product.name}`);

                const mealString = `${deliveryDate}: (${products.join(', ')})`;

                data.push(mealString);
            });

        	worksheet.addRow(data);
        });

		res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
   		res.setHeader('Content-Disposition', 'attachment; filename=orders.xlsx');

		await workbook.xlsx.write(res);

		res.end();
    }
    catch (err){
        console.log(err);
    }
}

async function fetchUsers(req, res){
    try {
        const users = await User.find({ role: 'user' });
        const orderViewers = await User.find({ role: 'order-viewer' });
        const menuEditors = await User.find({ role: 'menu-editor' });
        const admins = await User.find({ role: 'admin' });

        return res.status(200).json({ users, orderViewers, menuEditors, admins });
    }
    catch (err){
        console.log(err);
    }
}

async function grantRole(req, res){
    try {
        const { userId, role } = req.body;

        let user = await User.findById(userId);
        user.role = role;
        await user.save();

        return res.status(200).json({
            message: `role granted`,
            user: user
        });
    }
    catch (err){
        console.log(err);
    }
}

async function revokeRole(req, res){
    try {
        const userId = req.body.userId;

        let user = await User.findById(userId);
        user.role = 'user';
        await user.save();

        return res.status(200).json({
            message: `role revoked`,
            user: user
        });
    }
    catch (err){
        console.log(err);
    }
}

export {
    getOrders,
    exportOrders,
    fetchUsers,
    grantRole,
    revokeRole
};