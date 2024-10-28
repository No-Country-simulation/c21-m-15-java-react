# Repositorio del grupo c21-m-15-java-react

## Acerca de HealthPRO

HealthPRO es una aplicación de telemedicina que permite a los pacientes agendar citas con médicos y especialistas, así como también recibir atención médica a través de video llamadas.

**completar intro**

## Integrantes del equipo de trabajo

- Tamara Zarate
- Romina Rodriguez
- Jessica Mier
- Pablo Menchaca
- Chenhao Hu
- Federico Holc

## Tecnologías utilizadas

Frontend:

- React
- CSS / Material UI
- WebRTC / WebSockets

Backend:

- Java / Spring Boot
- PostgreSQL
- Docker
- NodeJs (WebSockets)

---

## Cómo correr el proyecto

### Correr Aplicación Backend

_Nota: Se debe tener Docker instalado y ejecutado._

Pasos:

1. Abrir una terminal.
2. Dirigirse a la raíz de la carpeta backend.
3. Escribir el comando `docker-compose up --build` para iniciar la aplicación backend.

#### Correr **SOLAMENTE** la Base de Datos

Pasos para inicializar la base de datos:

1. Abrir una terminal.
2. Dirigirse a la raíz de la carpeta backend.
3. Escribir el comando `docker-compose up postgres` para iniciar la Base de Datos.

Con la base de datos inicializada, podrás conectarte a la API al correrla desde un IDE u otra terminal.

#### Añadir Datos a la Base de Datos por Primera Vez

Mientras la aplicación está corriendo, los pasos para añadir los datos son:

1. Dirigirse a la raíz de la carpeta backend.
   ```sh
   cd backend
   ```
2. Copia data.sql en el contenedor de la base de datos
   ```sh
   docker cp data.sql postgres_container:/data.sql
   ```
3. Ejecuta data.sql en la base de datos
   ```sh
   docker exec -i postgres_container psql -U postgres -d backend -f /data.sql
   ```

### Correr Aplicación Frontend

Pasos:
1. Abrir una terminal.
2. Dirigirse a la raíz de la carpeta frontend.
3. Escribir el comando `npm install` para instalar las dependencias.
4. Escribir el comando `npm run dev` para iniciar la aplicación frontend.

### Correr el servidor de WebSockets

