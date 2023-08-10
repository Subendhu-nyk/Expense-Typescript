import express from 'express';
import fs from 'fs';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';

import sequelize from './util/expense';
import { User } from './models/user';
import { Expense } from './models/expense';
import { Order } from './models/orders';
import { Forgotpassword } from './models/resetpassword';

import router from './routes/expense';
import userRoutes from './routes/user';
import purchaseRoutes from './routes/purchase';
import premiumFeatureRoutes from './routes/premiumFeatures';
import resetPasswordRoutes from './routes/resetpassword';

dotenv.config();

const app = express();
const PORT = 2000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'views')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: logStream }));
app.use(router);
app.use('/user', userRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumFeatureRoutes);
app.use('/password', resetPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize.sync({ alter: true })
  .then(() => {
    app.listen(PORT);
    console.log('Server is listening on port', PORT);
    console.log('Database schema updated.');
  })
  .catch((err) => {
    console.error('Error updating database schema:', err);
  });