import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
// Routes Importations
import initialRoutes from './routes/initial.routes';
import usersRouter from './routes/users.routes';
import authRoutes from './routes/auth.routes';
import companyRoutes from './routes/company.routes';
import employeeRoutes from './routes/employees.routes';
import { verifyToken } from './middlewares/verifyToken';
import { SuperAdminPermision } from './middlewares/permissions';
const app = express();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// Routes All access
app.use('/', initialRoutes);
app.use('/users', usersRouter);
app.use('/login', authRoutes);

// Routes RESTRICTED access
app.use(verifyToken);
app.use(SuperAdminPermision);
app.use('/company', companyRoutes);
app.use('/employee', employeeRoutes);

export default app;
