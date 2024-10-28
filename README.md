# Repositorio del grupo c21-m-15-java-react

## Acerca de HealthPRO

HealthPRO es una aplicación de telemedicina que permite a los pacientes agendar citas con médicos y especialistas, así como también recibir atención médica a través de video llamadas.

## Integrantes del equipo de trabajo

- Tamara Zarate (frontend)
- Romina Rodriguez (frontend)
- Jessica Mier (frontend)
- Pablo Menchaca (testing/qa)
- Chenhao Hu (backend)
- Federico Holc (frontend)

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

Es posible correr el servidor de WebSockets de manera local (sobre todo si se desea hacer pruebas de desarrollo), ejecutando `node src/app.js` desde la carpeta `sockets-server`.
Pero para poder probar la funcionalidad de la videollamada entre computadoras que no se encuentran en una misma red o entre teléfonos móviles, es necesario desplegar el servidor en algún servicio online.
En nuestro caso, en el código del frontend, ya se encuentra configurada la URL del servidor de WebSockets en la variable `socketServerURL` para que apunte al servidor que desplegamos en render. Para cambiar la URL se debe modificar la linea `export const socketServerURL = "https://prueba-videollamada-back.onrender.com";` en el archivo `/frontend/src/components/videollamadas/socket-provider.jsx`.
Además, es necesario configurar los servidores STUN y TURN en el archivo `/frontend/src/hooks/useVideoCall.jsx`.
Para mayor detalle sobre esto último y el funcionamiento de la video llamada te recomendamos leer el anexo ["¿Cómo funciona la videollamada?"](#anexo---cómo-funciona-la-videollamada) al final de este documento.

---

## Anexo - ¿Cómo funciona la videollamada?

Para implementar la videollamada, utilizamos WebRTC (Web Real-Time Comunication), que es un conjunto de tecnologías/estándares de código abierto, que permiten la comunicación en tiempo real entre navegadores y aplicaciones. WebRTC fue desarrollado inicialmente por Google en 2011, y en la actualidad es mantenido principalmente por el W3C (World Wide Web Consortium) y el IETF (Internet Engineering Task Force).

Se puede consultar la documentación de WebRTC y sus APIs en su sitio oficial: https://webrtc.org/start/ y en la MDN Web Docs: https://developer.mozilla.org/es/docs/Web/API/WebRTC_API

WebRTC permite la conexión directa P2P (peer-to-peer) entre navegadores, sin necesidad de servidores intermedios. Pero los peers necesitan de algún modo poder intercambiar la información inicial (como por ejemplo la dirección IP y los puertos de cada uno) que les permita establecer la conexión. Para ello se suele utilizar lo que se conoce como servidor de señalización (signaling server).

WebRTC no define un protocolo de señalización, por lo que se pueden utilizar distintos protocolos y tecnologías para implementarlo, como podrían ser http, o una base de datos en tiempo real como Firebase Realtime Database, o WebSockets.

En nuestro caso, utilizamos WebSockets, que es un protocolo que mantiene una conexión bidireccional y persistente. Una vez establecida la conexión, tanto cliente como servidor pueden enviar mensajes en cualquier momento, y la conexión se mantiene abierta hasta que alguna de las partes la cierre.

Nuestro servidor de señalización lo desarrollamos en Node, utilizando socket.io, que es un una librería para implementar WebSockets, pero que además permite mantener la conexión utilizando http en caso de que WebSockets no esté disponible para alguno de los peers.

Si estás intentando correr el servidor de señalización en tu computadora, es posible que te encuentres con problemas de certificados SSL, ya que los navegadores no permiten la conexión a servidores no seguros. Para trabajar con https de manera local, podes utilizar certificados autofirmados, e ignorar las advertencias de seguridad del navegador. Tené en cuenta que si estás utilizando el servidor de señalización de manera local, también vas a tener que entrar a su URL en el navegador, aceptar el certificado y recién ahí la aplicación cliente va a poder hacer la conexión.

En nuestro código de la aplicación cliente, vas a encontrar que está establecida la conexión a un servidor de señalización ya desplegado en Render (https://render.com/). Podés cambiar la URL del servidor para utilizar el tuyo propio, ya sea desplegado o de manera local.

Se puede consultar la documentación de WebSockets su sitio oficial: https://websockets.spec.whatwg.org/ y en la MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API

Como mencionamos antes, el servidor de señalización, WebSockets mediante, se encarga del intercambio de información inicial. Pero no tiene la capacidad de establecer la conexión P2P directa entre los peers, ya que en muchos casos los peers están detrás de NATs (Network Address Translation) y firewalls, que impiden conocer la dirección IP pública de los dispositivos, o sus puertos.

Para solucionar este problema, WebRTC utiliza lo que se conoce como servidores STUN (Session Traversal Utilities for NAT) y TURN (Traversal Using Relays around NAT). STUN se utiliza para obtener la dirección IP pública de los dispositivos, y TURN se utiliza como servidor intermedio en caso de que la conexión P2P directa no sea posible.

Los servidores STUN suelen ser gratuitos, por ejemplo Google ofrece algunos libremente para su uso.

En nuestras pruebas, si las conexiones se realizaban dentro de la misma red local, o utilizando teléfonos, con dichos servidores STUN era suficiente para establecer la conexión P2P directa. Pero si los peers estaban en redes diferentes, como por ejemplo nuestras computadoras utilizando internet de nuestros proveedores no telefónicos, la conexión directa no era posible, y se necesitaba un servidor TURN.

El problema es que los servidores TURN suelen ser pagos, tanto si se utiliza alguno ya existente, como si se monta uno propio. Finalmente encontramos un servidor TURN llamado Metered, que ofrece un plan gratuito pero limitado a 500mb por mes. Por lo que si querés probar la videollamada con computadoras que no están en la misma red, vas a tener que crear una cuenta en Metered, y utilizar sus credenciales en el código de la aplicación cliente, ya que las que encontrás en el código seguramente ya no funcionen.

---
