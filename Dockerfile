# Usa una versión específica de Node.js
FROM node:20.11.0

# Establece el directorio de trabajo en el contenedor
WORKDIR /home/app/backend

# Copia solo los archivos de configuración de dependencias primero
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que se ejecutará el backend
EXPOSE 3000

# Inicia la aplicación en modo de desarrollo
CMD ["npm", "run", "dev"]
