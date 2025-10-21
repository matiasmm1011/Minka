// backend/routes/usuarios.js
const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

// POST - Registrar nuevo usuario
router.post('/registro', async (req, res) => {
  try {
    const { nombre, email, telefono, tipoUsuario, mensaje } = req.body;

    // Verificar si el email ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ 
        mensaje: 'Este email ya está registrado' 
      });
    }

    // Crear nuevo usuario
    const nuevoUsuario = new Usuario({
      nombre,
      email,
      telefono,
      tipoUsuario,
      mensaje
    });

    await nuevoUsuario.save();

    res.status(201).json({ 
      mensaje: 'Usuario registrado exitosamente',
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        email: nuevoUsuario.email
      }
    });

  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ 
      mensaje: 'Error en el servidor',
      error: error.message 
    });
  }
});

// GET - Obtener todos los usuarios (opcional, para administración)
router.get('/todos', async (req, res) => {
  try {
    const usuarios = await Usuario.find().sort({ fechaRegistro: -1 });
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ 
      mensaje: 'Error en el servidor',
      error: error.message 
    });
  }
});

// GET - Obtener usuario por ID (opcional)
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ 
      mensaje: 'Error en el servidor',
      error: error.message 
    });
  }
});

module.exports = router;