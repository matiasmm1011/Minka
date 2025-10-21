import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoUsuario: 'cliente',
    mensaje: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/api/usuarios/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          tipoUsuario: 'cliente',
          mensaje: ''
        });
        
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    }
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo-container">
            <div className="logo-icon">
              <svg viewBox="0 0 100 100" width="40" height="40">
                <rect width="100" height="100" rx="20" fill="#EF5350"/>
                <circle cx="35" cy="30" r="12" fill="#FFA726"/>
                <path d="M 35 45 Q 35 55, 35 65 Q 35 75, 45 75" fill="#FFA726"/>
                <circle cx="65" cy="30" r="12" fill="#26C6DA"/>
                <path d="M 65 45 Q 65 55, 65 65 Q 65 75, 55 75" fill="#26C6DA"/>
              </svg>
            </div>
            <span className="logo-text">Minka</span>
          </div>
          
          <ul className="nav-links">
            <li>
              <button 
                className={`nav-link ${activeTab === 'inicio' ? 'active' : ''}`}
                onClick={() => setActiveTab('inicio')}
              >
                Inicio
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'quienes-somos' ? 'active' : ''}`}
                onClick={() => setActiveTab('quienes-somos')}
              >
                Quiénes Somos
              </button>
            </li>
            <li>
              <button 
                className={`nav-link ${activeTab === 'registro' ? 'active' : ''}`}
                onClick={() => setActiveTab('registro')}
              >
                Registro
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* VISTA: INICIO */}
      {activeTab === 'inicio' && (
        <div className="tab-content">
          <section className="hero">
            <div className="hero-content">
              <div className="logo-hero">
                <svg viewBox="0 0 100 100" width="80" height="80">
                  <rect width="100" height="100" rx="20" fill="#EF5350"/>
                  <circle cx="35" cy="30" r="12" fill="#FFA726"/>
                  <path d="M 35 45 Q 35 55, 35 65 Q 35 75, 45 75" fill="#FFA726"/>
                  <circle cx="65" cy="30" r="12" fill="#26C6DA"/>
                  <path d="M 65 45 Q 65 55, 65 65 Q 65 75, 55 75" fill="#26C6DA"/>
                </svg>
              </div>
              <h1>Conectamos Talento con Oportunidades</h1>
              <p className="subtitle">
                La plataforma boliviana que une a quienes buscan servicios con quienes los ofrecen
              </p>
              <button className="cta-button" onClick={() => setActiveTab('registro')}>
                Únete Ahora
              </button>
            </div>
          </section>

          {/* El Problema */}
          <section className="problem-section">
            <div className="container">
              <h2 className="section-title">¿Cuál es el Problema?</h2>
              <div className="problem-content">
                <div className="problem-card">
                  <div className="problem-icon">💼</div>
                  <h3>Para quienes ofrecen servicios</h3>
                  <p>
                    Miles de profesionales y trabajadores independientes en Bolivia luchan para conseguir 
                    clientes de forma constante. Dependen de recomendaciones personales, grupos informales 
                    de WhatsApp o Facebook, lo que genera incertidumbre económica y pérdida de tiempo.
                  </p>
                  <p>
                    <strong>El resultado:</strong> Trabajo inestable, dificultad para planificar y dependencia 
                    de contactos personales limitados.
                  </p>
                </div>

                <div className="problem-card">
                  <div className="problem-icon">🔍</div>
                  <h3>Para quienes buscan servicios</h3>
                  <p>
                    Las personas necesitan contratar servicios (limpieza, reparaciones, clases, etc.) pero 
                    enfrentan desconfianza, falta de opciones verificadas y dificultad para comparar precios 
                    y calidad de forma segura.
                  </p>
                  <p>
                    <strong>El resultado:</strong> Riesgos al contratar desconocidos, pérdida de tiempo 
                    buscando por redes sociales y falta de garantías.
                  </p>
                </div>
              </div>

              <div className="solution-box">
                <h3>💡 Nuestra Solución</h3>
                <p>
                  <strong>Minka</strong> es una aplicación que conecta a personas que ofrecen servicios 
                  con quienes los necesitan de forma <strong>rápida, segura y verificada</strong>. 
                  Sin intermediarios complicados, sin largas búsquedas en redes sociales.
                </p>
                <p>
                  Todo en un solo lugar: perfiles verificados, reseñas reales, precios transparentes 
                  y conexión inmediata.
                </p>
              </div>
            </div>
          </section>

          {/* Servicios con Imágenes */}
          <section className="services-showcase">
            <div className="container">
              <h2 className="section-title">Servicios que Conectamos</h2>
              <p className="section-subtitle">
                Desde clases particulares hasta reparaciones del hogar, encuentra todo en Minka
              </p>
              <div className="services-grid">
                <div className="service-image-card">
                  <div className="service-image" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                    <div className="service-icon">👨‍🏫</div>
                  </div>
                  <h3>Educación</h3>
                  <p>Clases particulares, tutorías, idiomas</p>
                </div>

                <div className="service-image-card">
                  <div className="service-image" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
                    <div className="service-icon">🔧</div>
                  </div>
                  <h3>Técnicos</h3>
                  <p>Plomeros, electricistas, mecánicos</p>
                </div>

                <div className="service-image-card">
                  <div className="service-image" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
                    <div className="service-icon">🏠</div>
                  </div>
                  <h3>Hogar</h3>
                  <p>Limpieza, jardinería, mantenimiento</p>
                </div>

                <div className="service-image-card">
                  <div className="service-image" style={{background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'}}>
                    <div className="service-icon">💼</div>
                  </div>
                  <h3>Profesionales</h3>
                  <p>Contadores, abogados, consultores</p>
                </div>

                <div className="service-image-card">
                  <div className="service-image" style={{background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'}}>
                    <div className="service-icon">💄</div>
                  </div>
                  <h3>Belleza</h3>
                  <p>Peluquería, maquillaje, estética</p>
                </div>

                <div className="service-image-card">
                  <div className="service-image" style={{background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'}}>
                    <div className="service-icon">🏥</div>
                  </div>
                  <h3>Salud</h3>
                  <p>Enfermería, fisioterapia, cuidado</p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección de Precios */}
          <section className="pricing-section">
            <div className="container">
              <h2 className="section-title">Precios Transparentes</h2>
              <p className="section-subtitle">
                Sin costos ocultos. Solo pagas cuando conectas exitosamente.
              </p>
              
              <div className="pricing-container">
                <div className="pricing-card main-pricing">
                  <div className="pricing-badge">Modelo de Comisión</div>
                  <div className="pricing-icon">💰</div>
                  <h3>Solo 5% por Servicio</h3>
                  <div className="pricing-percentage">5%</div>
                  <p className="pricing-description">
                    Cobramos únicamente una pequeña comisión del <strong>5% sobre el precio acordado</strong> cuando 
                    un servicio es completado exitosamente a través de la aplicación.
                  </p>
                  
                  <div className="pricing-example">
                    <h4>Ejemplo:</h4>
                    <div className="example-row">
                      <span>Precio del servicio:</span>
                      <span className="price">Bs. 200</span>
                    </div>
                    <div className="example-row">
                      <span>Comisión Minka (5%):</span>
                      <span className="price">Bs. 10</span>
                    </div>
                    <div className="example-row total">
                      <span>El profesional recibe:</span>
                      <span className="price">Bs. 190</span>
                    </div>
                  </div>

                  <div className="pricing-features">
                    <div className="feature-item">
                      <span className="check">✓</span>
                      <span>Registro completamente gratuito</span>
                    </div>
                    <div className="feature-item">
                      <span className="check">✓</span>
                      <span>Sin costos mensuales ni suscripciones</span>
                    </div>
                    <div className="feature-item">
                      <span className="check">✓</span>
                      <span>Solo pagas cuando trabajas</span>
                    </div>
                    <div className="feature-item">
                      <span className="check">✓</span>
                      <span>Sin límite de clientes o servicios</span>
                    </div>
                  </div>
                </div>

                <div className="pricing-benefits">
                  <h3>¿Por qué este modelo?</h3>
                  <div className="benefit-item">
                    <div className="benefit-icon">🎯</div>
                    <div>
                      <h4>Sin Riesgo</h4>
                      <p>No pagas nada si no consigues trabajo. El riesgo es nuestro.</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">💪</div>
                    <div>
                      <h4>Todos Ganan</h4>
                      <p>Solo ganamos si tú ganas. Estamos alineados con tu éxito.</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">🔒</div>
                    <div>
                      <h4>Transparente</h4>
                      <p>Sabes exactamente cuánto pagarás antes de aceptar cualquier trabajo.</p>
                    </div>
                  </div>
                  <div className="benefit-item">
                    <div className="benefit-icon">🚀</div>
                    <div>
                      <h4>Accesible</h4>
                      <p>No necesitas inversión inicial. Empieza a trabajar desde hoy.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pricing-note">
                <p>
                  <strong>Nota:</strong> La comisión se calcula automáticamente y se descuenta solo cuando 
                  ambas partes confirman que el servicio fue completado satisfactoriamente.
                </p>
              </div>
            </div>
          </section>

          {/* Características */}
          <section className="features-section">
            <div className="container">
              <h2 className="section-title">¿Por qué Minka?</h2>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">✅</div>
                  <h3>Verificación de Identidad</h3>
                  <p>Todos los usuarios pasan por un proceso de verificación para garantizar seguridad y confianza.</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">⚡</div>
                  <h3>Conexión Rápida</h3>
                  <p>Encuentra servicios o clientes en minutos, no en días. Búsqueda por zona y disponibilidad inmediata.</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">⭐</div>
                  <h3>Reseñas Reales</h3>
                  <p>Sistema de calificaciones y comentarios para tomar decisiones informadas y seguras.</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">💳</div>
                  <h3>Pagos Seguros</h3>
                  <p>Opciones de pago flexibles: efectivo o digital, con protección para ambas partes.</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">📱</div>
                  <h3>Fácil de Usar</h3>
                  <p>Interfaz simple e intuitiva, diseñada para que cualquier persona pueda usarla sin complicaciones.</p>
                </div>

                <div className="feature-card">
                  <div className="feature-icon">🤝</div>
                  <h3>Sin Costos Iniciales</h3>
                  <p>Regístrate gratis. Solo cobramos una pequeña comisión cuando se completa un servicio exitoso.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <section className="cta-section">
            <div className="container">
              <h2>¿Listo para comenzar?</h2>
              <p>Únete a la comunidad de Minka y transforma tu forma de trabajar o contratar servicios</p>
              <button className="cta-button-secondary" onClick={() => setActiveTab('registro')}>
                Registrarme Ahora
              </button>
            </div>
          </section>
        </div>
      )}

      {/* VISTA: QUIÉNES SOMOS */}
      {activeTab === 'quienes-somos' && (
        <div className="tab-content">
          <section className="about-hero">
            <div className="container">
              <h1>Quiénes Somos</h1>
              <p className="lead">
                Somos un equipo boliviano comprometido con mejorar la forma en que las personas 
                encuentran y ofrecen servicios en Bolivia.
              </p>
            </div>
          </section>

          <section className="about-section">
            <div className="container">
              <div className="about-content-grid">
                <div className="about-block">
                  <h2>🎯 Nuestra Misión</h2>
                  <p>
                    Facilitar conexiones significativas, transparentes y eficientes entre personas 
                    que ofrecen servicios y quienes los necesitan. Inspirados en el espíritu de 
                    colaboración de la "minka" tradicional andina, creamos un espacio digital donde 
                    el trabajo y la oportunidad se encuentran de manera justa y accesible.
                  </p>
                </div>

                <div className="about-block">
                  <h2>👁️ Nuestra Visión</h2>
                  <p>
                    Ser la plataforma líder en Bolivia para la conexión de servicios profesionales 
                    y domésticos, reconocida por su confiabilidad, simplicidad y impacto positivo 
                    en la vida de miles de personas que trabajan de forma independiente.
                  </p>
                </div>

                <div className="about-block">
                  <h2>💡 Nuestros Valores</h2>
                  <ul className="values-list">
                    <li><strong>Confianza:</strong> Verificación y transparencia en cada interacción</li>
                    <li><strong>Simplicidad:</strong> Tecnología accesible para todos</li>
                    <li><strong>Rapidez:</strong> Conexiones inmediatas sin complicaciones</li>
                    <li><strong>Comunidad:</strong> Apoyo mutuo entre usuarios</li>
                  </ul>
                </div>

                <div className="about-block">
                  <h2>🚀 Cómo Funciona</h2>
                  <div className="steps">
                    <div className="step">
                      <span className="step-number">1</span>
                      <p><strong>Regístrate:</strong> Crea tu perfil en minutos</p>
                    </div>
                    <div className="step">
                      <span className="step-number">2</span>
                      <p><strong>Busca o Ofrece:</strong> Encuentra servicios o publica los tuyos</p>
                    </div>
                    <div className="step">
                      <span className="step-number">3</span>
                      <p><strong>Conecta:</strong> Chat directo con la persona indicada</p>
                    </div>
                    <div className="step">
                      <span className="step-number">4</span>
                      <p><strong>Califica:</strong> Deja tu reseña y ayuda a la comunidad</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección de Contacto */}
              <div className="contact-section">
                <h2>📞 Información de Contacto</h2>
                <div className="contact-grid">
                  <div className="contact-item">
                    <div className="contact-icon">📧</div>
                    <h3>Email</h3>
                    <a href="mailto:matias10meneses@gmail.com">matias10meneses@gmail.com</a>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">📱</div>
                    <h3>Teléfono</h3>
                    <a href="tel:+59176763090">76763090</a>
                  </div>

                  <div className="contact-item">
                    <div className="contact-icon">💬</div>
                    <h3>WhatsApp</h3>
                    <a href="https://chat.whatsapp.com/KfsHXbH5ZfCFuDjHf5mGp9" target="_blank" rel="noopener noreferrer">
                      Únete al Grupo
                    </a>
                  </div>
                </div>
              </div>

              {/* Redes Sociales */}
              <div className="social-section">
                <h2>🌐 Síguenos en Redes Sociales</h2>
                <p>Mantente al día con nuestras últimas novedades y actualizaciones</p>
                <div className="social-links">
                  <a href="https://www.tiktok.com/@minkaupb?_t=ZM-90ieskWhefL&_r=1" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="social-button tiktok">
                    <span>🎵</span> TikTok
                  </a>
                  <a href="https://chat.whatsapp.com/KfsHXbH5ZfCFuDjHf5mGp9" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="social-button whatsapp">
                    <span>💬</span> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* VISTA: REGISTRO */}
      {activeTab === 'registro' && (
        <div className="tab-content">
          <section className="registro-hero">
            <div className="container">
              <h1>Únete a Minka</h1>
              <p>Regístrate y comienza a conectar con oportunidades</p>
            </div>
          </section>

          <section className="form-section">
            <div className="container">
              <div className="form-container">
                {submitStatus === 'success' && (
                  <div className="success-message">
                    ✅ ¡Registro exitoso! Te contactaremos pronto para completar tu verificación.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="error-message">
                    ❌ Hubo un error. Por favor, intenta nuevamente o contáctanos por WhatsApp.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Nombre Completo *</label>
                    <input
                      type="text"
                      name="nombre"
                      className="form-input"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej: Juan Pérez"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Teléfono / WhatsApp *</label>
                    <input
                      type="tel"
                      name="telefono"
                      className="form-input"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      required
                      placeholder="Ej: 76763090"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Me interesa como: *</label>
                    <select
                      name="tipoUsuario"
                      className="form-input"
                      value={formData.tipoUsuario}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="cliente">Cliente - Busco servicios</option>
                      <option value="profesional">Profesional - Ofrezco servicios</option>
                      <option value="ambos">Ambos</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Cuéntanos más (Opcional)</label>
                    <textarea
                      name="mensaje"
                      className="form-input form-textarea"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      placeholder="¿Qué servicios ofreces o buscas? ¿En qué zona te encuentras?"
                    />
                  </div>

                  <button type="submit" className="submit-button">
                    Registrarme en Minka
                  </button>

                  <p className="form-note">
                    Al registrarte, aceptas que revisaremos tu información para verificar tu identidad 
                    y garantizar la seguridad de nuestra comunidad.
                  </p>
                </form>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <svg viewBox="0 0 100 100" width="40" height="40">
              <rect width="100" height="100" rx="20" fill="#EF5350"/>
              <circle cx="35" cy="30" r="12" fill="#FFA726"/>
              <path d="M 35 45 Q 35 55, 35 65 Q 35 75, 45 75" fill="#FFA726"/>
              <circle cx="65" cy="30" r="12" fill="#26C6DA"/>
              <path d="M 65 45 Q 65 55, 65 65 Q 65 75, 55 75" fill="#26C6DA"/>
            </svg>
            <span>Minka</span>
          </div>
          <p>&copy; 2024 Minka - Bolivia. Todos los derechos reservados.</p>
          <p className="footer-tagline">Conectando talento con oportunidades en toda Bolivia</p>
        </div>
      </footer>
    </div>
  );
}

export default App;