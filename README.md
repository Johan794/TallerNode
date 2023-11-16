# Proyecto Backend TallerNode con Node.js, TypeScript y MongoDB 🛠️

Este proyecto, denominado TallerNode, se centra en el desarrollo de una aplicación backend robusta utilizando Node.js, TypeScript y MongoDB. La aplicación proporciona operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para usuarios y grupos, gestionando la autenticación de usuarios y permitiendo asociaciones entre usuarios y grupos.


1. **Clonar el Repositorio:**
   ```bash
   git clone https://github.com/Johan794/TallerNode.git
   cd TallerNode
   ```

## Configuración y Ejecución del Proyecto

### Gestión de Dependencias
El proyecto se puede manejar con `npm`, `yarn`, y `pnpm`. Puedes elegir tu gestor de paquetes favorito para instalar las dependencias.

- **Instalación con npm:**
   ```bash
   npm install
   ```

- **Instalación con yarn:**
   ```bash
   yarn install
   ```

- **Instalación con pnpm:**
   ```bash
   pnpm install
   ```

### Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto:

- `PORT`: Puerto en el que la aplicación se ejecutará.
- `MONGO_CONNECTION_STRING`: Cadena de conexión a la base de datos MongoDB.
- `JWT_SECRET`: Clave secreta para la generación de tokens JWT.
- `JWT_EXPIRATION_TIME`: Tiempo de expiración de los tokens JWT.

Ejemplo de archivo `.env`:

```env
PORT=3000
MONGO_CONNECTION_STRING=mongodb://localhost:27017/taller_node
JWT_SECRET=mysecretkey
JWT_EXPIRATION_TIME=86400
```

### Ejecución del Proyecto

```bash
npm start
```

## Endpoints

### Autenticacion 
- **Login:**
  - Método: `POST`
  - Ruta: `/login`
  - Descripción: Inicia sesion con correo y contraseña de un usuario existente en la base de datos.

  Ejemplo de Request:
  ```json
  {
   "email": "user@gmail.com",
   "password" : "1234"
  }
  ```


### Usuarios
- **Crear un Nuevo Usuario:**
  - Método: `POST`
  - Ruta: `/users`
  - Descripción: Crea un nuevo usuario con validaciones adecuadas. El rol por defecto es `user`.

  Ejemplo de Request:
  ```json
  {
    "name": "user",
    "email": "user@gmail.com",
    "password" : "1234"
  }
  ```

- **Visualizar Datos de un Usuario:**
  - Método: `GET`
  - Ruta: `/users/:id`
  - Descripción: Obtiene los datos de un usuario por su ID.

  Ejemplo de Request:
  ```
  GET /users/123
  ```
- **Visualizar Datos de todo los  Usuarios:**
  - Método: `GET`
  - Ruta: `/users`
  - Descripción: Obtiene los datos de todos los usuarios.

  Ejemplo de Request:
  ```
  GET /users
  ```

- **Actualizar Datos de un Usuario:**
  - Método: `PUT`
  - Ruta: `/users/:id`
  - Descripción: Actualiza la información de un usuario.

  Ejemplo de Request:
  ```json
    {
      "name": "Campaz",
      "email": "campaz@gmail.com",
      "password" : "campaz"
    }
  ```

- **Eliminar un Usuario:**
  - Método: `DELETE`
  - Ruta: `/users/:id`
  - Descripción: Elimina un usuario.

  Ejemplo de Request:
  ```
  DELETE /users/123
  ```

### Grupos
- **Crear un Nuevo Grupo:**
  - Método: `POST`
  - Ruta: `/groups`
  - Descripción: Crea un nuevo grupo con validaciones adecuadas.

  Ejemplo de Request:
  ```json
  {
    "name": "GrupoNuevo",
  }
  ```

- **Listar Todos los Grupos y Sus Usuarios:**
  - Método: `GET`
  - Ruta: `/groups`
  - Descripción: Obtiene la lista de todos los grupos y sus usuarios asociados.

  Ejemplo de Request:
  ```
  GET /groups
  ```

- **Listar un grupo los Grupos y Sus Usuarios:**
  - Método: `GET`
  - Ruta: `/groups:id`
  - Descripción: Obtiene la lista de un  grupo por su id y sus usuarios asociados.

  Ejemplo de Request:
  ```
  GET /groups
  ```

- **Actualizar la Información de un Grupo:**
  - Método: `PUT`
  - Ruta: `/groups:id`
  - Descripción: Actualiza la información de un grupo.

  Ejemplo de Request:
  ```json
  {
    "name": "GrupoActualizado"
  }
  ```

- **Eliminar un Grupo:**
  - Método: `DELETE`
  - Ruta: `/groups:id`
  - Descripción: Elimina un grupo.

  Ejemplo de Request:
  ```
  DELETE /groups/456
  ```

### Asociaciones
- **Agregar Usuario a un Grupo:**
  - Método: `PATCH`
  - Ruta: `/groups/add/:idGroup`
  - Descripción: Asocia un usuario a un grupo. El usuario se agrega pasando su nombre.

  Ejemplo de Request:
  ```json
  {
    "name": "usuario1"
  }
  ```

- **Remover Usuarios de un Grupo:**
  - Método: `PATCH`
  - Ruta: `/groups/remove/:groupId/user/:userId`
  - Descripción: Desvincula usuarios de un grupo.

  Ejemplo de Request:
  ```
  PATCH /groups/remove/123/user/456
  ```

- **Listar Usuarios por Grupo:**
  - Método: `GET`
  - Ruta: `/users/groups/:groupName`
  - Descripción: Obtiene la lista de usuarios pertenecientes a un grupo específico.

  Ejemplo de Request:
  ```
  GET /users/groups/G1
  ```

- **Listar Grupos por Usuario:**
  - Método: `GET`
  - Ruta: `/groups/users/:userName`
  - Descripción: Obtiene la lista de grupos a los que un usuario específico está asociado.
 ```
  GET /users/groups/G1
  ```
 ## Autenticación y Autorización

- **Autenticación de Usuarios usando JWT:**
  - La aplicación implementa autenticación de usuarios mediante JSON Web Tokens (JWT).

- **Protección de Rutas CRUD:**
  - Se utiliza middleware de autenticación y autorización para proteger las rutas CRUD. Solo los usuarios con rol de superadmin pueden crear usuarios.

## Dependencias principales 🤠
 ```
  "dependencies": {
    "bcrypt": "^5.1.1",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongo": "^0.1.0",
    "mongoose": "^7.6.3",
}

  ```

## Video Tutorial

Para obtener una guía detallada sobre el funcionamiento, consulta nuestro [corto video explicativo](https://www.youtube.com/watch?v=FyswJ38ophI).

¡Esperamos que disfrutes trabajando con TallerNode! 🚀



