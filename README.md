# Backend - E-commerce de Pokémon

Este proyecto backend es la parte de un **e-commerce de Pokémon**. La aplicación maneja la autenticación de usuarios, operaciones de inicio de sesión, registro, y gestión de contraseñas cifradas. El backend utiliza **Neon** como base de datos **serverless** que soporta **PostgreSQL**.

## Tecnologías utilizadas

- **Node.js** con **Express** para el servidor backend.
- **JWT (JSON Web Tokens)** para la autenticación y autorización de usuarios.
- **bcryptjs** para encriptar y verificar las contraseñas de los usuarios.
- **Neon** como base de datos **serverless** que soporta **PostgreSQL**.

## Conexión con Neon

Este proyecto utiliza **Neon** para gestionar la base de datos. **Neon** es un servicio **serverless** que soporta **PostgreSQL**, lo que significa que no necesitas preocuparte por la infraestructura del servidor de base de datos, ya que se escala automáticamente según la demanda.

La conexión con Neon se realiza mediante las credenciales proporcionadas en las variables de entorno, y **PostgreSQL** se utiliza para almacenar los datos de los usuarios y otras entidades necesarias para el funcionamiento del e-commerce.

## Funcionalidades

### Gestión de usuarios

- **Registro de usuarios**: Los usuarios pueden registrarse en el sistema proporcionando un **nombre de usuario**, **correo electrónico** y **contraseña**.
- **Inicio de sesión**: Los usuarios pueden iniciar sesión utilizando su **correo electrónico** y **contraseña**. Si las credenciales son correctas, se genera un **token JWT** para la autenticación en futuras peticiones.
- **Cifrado de contraseñas**: Las contraseñas de los usuarios se encriptan utilizando **bcryptjs** antes de ser almacenadas en la base de datos. Esto asegura que las contraseñas nunca se guarden en texto plano.

### Autenticación con JWT

- **JWT (JSON Web Tokens)** se utiliza para autenticar las peticiones de los usuarios después de que inician sesión. El token generado es enviado al cliente y debe incluirse en las solicitudes subsecuentes para validar la autenticidad del usuario.
- El token tiene un **tiempo de expiración**, por lo que el usuario deberá volver a iniciar sesión después de que este expire.

## Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/ecommerce-pokemon-backend.git
cd ecommerce-pokemon-backend
