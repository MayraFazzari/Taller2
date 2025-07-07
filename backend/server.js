import express from 'express';
import cors from 'cors';
import userRoutes from './src/routes/user.routes.js';
import productosRoutes from './src/routes/productos.routes.js';

const app = express(); 

app.use(cors());
app.use(express.json());

// Servir imágenes
app.use('/public', express.static('public'));

// Rutas
app.use('/api', userRoutes);
app.use('/productos', productosRoutes);

app.listen(5000, () => {
  console.log('todoOk');
});
