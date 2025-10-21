const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/minka', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Middleware
app.use(cors({
  origin: [
    'https://minka-roan.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// Modelo de Usuario (ya lo tienes en Usuario.js)
const Usuario = require('./models/Usuario');

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: '✅ Backend Minka funcionando!' });
});

// Ruta de registro - COMPATIBLE con tu frontend
app.post('/api/usuarios/registro', async (req, res) => {
  console.log('📨 Recibiendo registro:', req.body);
  
  try {
    const { nombre, email, telefono, tipoUsuario, mensaje } = req.body;

    // Validaciones
    if (!nombre || !email || !telefono) {
      return res.status(400).json({ 
        error: 'Nombre, email y teléfono son requeridos' 
      });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ 
        error: 'Ya existe un usuario con este email' 
      });
    }

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      telefono,
      tipoUsuario: tipoUsuario || 'cliente',
      mensaje: mensaje || ''
    });

    // Guardar en la base de datos
    const usuarioGuardado = await nuevoUsuario.save();
    
    console.log('✅ Usuario registrado:', usuarioGuardado._id);
    
    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      usuario: {
        id: usuarioGuardado._id,
        nombre: usuarioGuardado.nombre,
        email: usuarioGuardado.email
      }
    });

  } catch (error) {
    console.error('❌ Error en registro:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: 'Ya existe un usuario con este email' 
      });
    }
    
    res.status(500).json({ 
      error: 'Error interno del servidor',
      details: error.message 
    });
  }
});

// Ruta para obtener todos los usuarios (solo para testing)
app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.find().sort({ fechaRegistro: -1 });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📧 MongoDB: ${process.env.MONGODB_URI ? 'Conectado' : 'No configurado'}`);
});
