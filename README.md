# Orders Platform

## Descripción

Orders Platform es una aplicación que permite gestionar pedidos, clientes, comercios y repartidores. Está construida utilizando Node.js, Express, TypeScript y Sequelize ORM para la interacción con una base de datos PostgreSQL. La aplicación está diseñada para ser ejecutada tanto localmente como en un entorno de contenedores Docker, facilitando su despliegue en plataformas como DigitalOcean.

## Características

- CRUD para Clientes
- CRUD para Comercios
- CRUD para Repartidores
- CRUD para Pedidos
- Historial de pedidos por comercio, cliente y repartidor
- Cambio de estado de pedidos
- Recuperación de pedidos por estado
- Validación de datos de entrada con `express-validator`
- Manejo de errores
- Persistencia de datos en contenedores Docker

## Requisitos

- Node.js v14+
- Docker
- Docker Compose

## Configuración

### Variables de Entorno

El proyecto usa variables de entorno para configurar la base de datos y el servidor. Hay dos archivos `.env` necesarios:

1. `.env.local` para el desarrollo local
2. `.env` para el despliegue en DigitalOcean

#### `.env.local`

```env
DB_HOST=localhost
DB_NAME=orders_platform
DB_USER=postgres
DB_PASS=postgres

PORT=3000
POSTGRES_PORT=5432
```

#### `.env`

```env
DB_HOST=postgres
DB_NAME=orders_platform
DB_USER=postgres
DB_PASS=postgres

PORT=3000
POSTGRES_PORT=5432
```

### Docker Compose

#### `compose.local.yml`

Este archivo se usa para ejecutar la base de datos Postgres en un contenedor Docker localmente.

```yaml
services:
  postgres:
    image: postgres:alpine3.19
    restart: always
    ports:
      - "${POSTGRES_PORT}:5432"
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASS}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
    driver: local
```

#### `compose.yml`

Este archivo se usa para ejecutar tanto la API como la base de datos en contenedores Docker en DigitalOcean.

```yaml
services:
  postgres:
    image: postgres:alpine3.19
    restart: always
    ports:
      - "${POSTGRES_PORT}:5432"
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASS}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build: .
    restart: always
    ports:
      - "${PORT}:3000"
    depends_on:
      - postgres
    environment:
      DB_HOST: ${DB_HOST}
      DB_NAME: ${DB_NAME}
      DB_USER: ${DB_USER}
      DB_PASS: ${DB_PASS}
    volumes:
      - .:/usr/src/app
    command: npm start

volumes:
  postgres_data:
    driver: local
```

### Dockerfile

```dockerfile
# Usan una imagen base con Node.js
FROM node:14

# Determina el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila el código TypeScript a JavaScript
RUN npm run build

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Setea el comando para ejecutar la aplicación
CMD ["npm", "start"]
```

## Instalación y Ejecución
### Localmente con VSCode y Docker para Postgres

1. Cloná el repositorio:
    ```sh
    git clone <url-del-repositorio>
    cd orders-platform
    ```

2. Creá el archivo `.env.local`:
    ```sh
    touch .env.local
    ```

3. Iniciá el contenedor de Postgres:
    ```sh
    docker compose -f compose.local.yml up -d
    ```

4. Instalá las dependencias:
    ```sh
    npm install
    ```

5. Ejecutá el proyecto desde VSCode:
    ```sh
    npm run dev
    ```

### Despliegue en DigitalOcean

1. Creá el archivo `.env`:
    
    
    ```sh
    touch .env
    ```
2. Copiá el contenido de la [sección de configuración](#configuración) dentro de este nuevo archivo env.
3. Generá y ejecutá los contenedores:
    ```sh
    docker compose up --build -d
    ```

## Verificación
### Acceder a la API
Después de ejecutar docker-compose up --build, deberías poder acceder a tu API en `http://localhost:3000`. Utiliza esta dirección raíz para acceder a los endpoints de la API.

### Acceder a la Base de Datos
Puedes acceder a la base de datos Postgres en `localhost:5432` con las credenciales definidas en el archivo **.env** *(esta es la raíz para acceder a los endpoints de la base de datos)*.

### Conexión a la Base de Datos
Para conectar y visualizar la base de datos con un programa de administración de bases de datos (como *pgAdmin*, *DBeaver*, o *TablePlus*), configurá los siguientes parámetros:

- **Host**: localhost
- **Port**: 5432
- **Database**: orders_platform
- **User**: postgres
- **Password**: postgres

## Uso de la API

### Endpoints

#### `Clientes`
- **GET** /clients: Obtener todos los clientes
- **GET** /clients/:id: Obtener un cliente por ID
- **POST** /clients: Crear un nuevo cliente
- **PUT** /clients/:id: Actualizar un cliente por ID
- **DELETE** /clients/:id: Eliminar un cliente por ID
- **GET** /clients/:id/orders: Obtener los pedidos de un cliente

#### `Comercios`
- **GET** /commerces: Obtener todos los comercios
- **GET** /commerces/:id: Obtener un comercio por ID
- **POST** /commerces: Crear un nuevo comercio
- **PUT** /commerces/:id: Actualizar un comercio por ID
- **DELETE** /commerces/:id: Eliminar un comercio por ID
- **GET** /commerces/:id/orders: Obtener los pedidos de un comercio

#### `Repartidores`
- **GET** /deliverymen: Obtener todos los repartidores
- **GET** /deliverymen/:id: Obtener un repartidor por ID
- **POST** /deliverymen: Crear un nuevo repartidor
- **PUT** /deliverymen/:id: Actualizar un repartidor por ID
- **DELETE** /deliverymen/:id: Eliminar un repartidor por ID
- **GET** /deliverymen/:id/orders: Obtener los pedidos de un repartidor

#### `Pedidos`
- **GET** /orders: Obtener todos los pedidos
- **GET** /orders/:id: Obtener un pedido por ID
- **POST** /orders: Crear un nuevo pedido
- **PUT** /orders/:id: Actualizar un pedido por ID
- **DELETE** /orders/:id: Eliminar un pedido por ID
- **GET** /orders/state/:state: Obtener pedidos por estado

## Contribución
Si querés contribuir a este proyecto, por favor seguí los siguientes pasos:

1. Hacé un fork del proyecto.
2. Creá una nueva rama (git checkout -b feature/nueva-feature).
3. Realizá los cambios necesarios y agregá los comentarios (git commit -am 'Agregar nueva feature').
4. Subí los cambios a tu fork (git push origin feature/nueva-feature).
5. Abrí un Pull Request.

## Licencia
Este proyecto está licenciado bajo la licencia MIT. 