// # IMPORTS
// ## IMPORTING LIBS
import express from 'express';

// ## IMPORTING ROUTES
import genericRoutes from './routes/generic';
import assetRoutes from './routes/assets';
import devRoutes from './routes/dev';

// # MAIN
// ## CREATING APP
const app = express();

// ## MIDDLEWARES
app.use(express.json());
//app.use(express.static('public'));

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
app.use('/', genericRoutes);
app.use('/', assetRoutes);
app.use('/dev', devRoutes);

// # EXPORTING DEFAULT
export default app;
