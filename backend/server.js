import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/user.routes.js'; 

const app = express();

app.use(cors()); 
app.use(express.json());

app.use('/api', userRoutes); 

app.listen(5000, () => {
  console.log('todoOk');
});
