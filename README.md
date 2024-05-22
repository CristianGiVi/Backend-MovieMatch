# MovieMatch App

MovieMatch es una aplicación web para buscar y descubrir películas y series de televisión. Permite a los 
usuarios registrados explorar, calificar y escribir reseñas sobre contenido audiovisual.

## Funcionalidades Actuales

- Registro de usuarios.
- Inicio de sesión y autenticación de usuarios.
- Obtención de información de películas.
- Gestión de reseñas de películas.
- Autenticación mediante tokens JWT.

## Funcionalidades Futuras

- Integración con servicio de streaming para obtener información en tiempo real.
- Mejora en la gestión de la base de datos para un rendimiento óptimo.
- Implementación de filtros avanzados para la búsqueda de películas.
- Integración de notificaciones para usuarios registrados.

## Tecnologías Utilizadas

- Node.js: Plataforma de desarrollo de aplicaciones en JavaScript del lado del servidor.
- Express.js: Framework web de Node.js para la creación de APIs RESTful.
- Sequelize: ORM para Node.js que facilita la interacción con la base de datos MySQL.
- JSON Web Tokens (JWT): Para la autenticación y manejo de sesiones de usuarios.

## Instalación y Uso

1. Clona el repositorio en tu máquina local:

2. Navega al directorio del proyecto e instala las dependencias.
  
3. Configura las variables de entorno creando un archivo .env en la raíz del proyecto y define las variables necesarias:

- DB_NAME
- DB_USER
- DB_PASSWORD
- SECRET

4. Inicia la aplicación en modo de desarrollo.

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
3. Realiza tus cambios y haz commits (git commit -am 'Agrega nueva funcionalidad').
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Crea un nuevo Pull Request.

## Autores

- Cristian Giraldo Villegas [CristianGiVi](https://github.com/CristianGiVi)
