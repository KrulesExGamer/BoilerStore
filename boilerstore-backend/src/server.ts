// # IMPORTS
// ## IMPORTING LIBS
import express from 'express';
import cors from 'cors';

// ## IMPORTING ROUTES
import genericRoutes from './routes/generic';
import assetRoutes from './routes/assets';
import devRoutes from './routes/dev';
import userRoutes from './routes/users';

// # MAIN
// ## CREATING APP
const app = express();

// ## MIDDLEWARES
app.use(express.json());
//app.use(express.static('public'));
app.use(cors());

app.use('/', async (req, res, next) => {
	console.log('[REQUEST] INCOMING REQUEST ');
	try {
		next();
	} catch (err: any) {
		console.log('[ERROR] Could not process request.');
		console.log(err);
	}
});

// ## APPLYING ROUTES
app.use('/api', genericRoutes);
app.use('/api', assetRoutes);
app.use('/api', userRoutes);
app.use('/api/dev', devRoutes);

// # EXPORTING DEFAULT
export default app;
