# Etapa 1: Construcción
FROM maven:3.9.4-eclipse-temurin-17 AS build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de configuración de Maven (pom.xml)
COPY pom.xml .

# Descarga las dependencias sin compilar el código
RUN mvn dependency:go-offline

# Copia el código fuente del proyecto
COPY src ./src

# Compila el proyecto y genera el archivo JAR
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo JAR generado desde la etapa de construcción
COPY --from=build /app/target/*.jar /app/backend.jar

# Expone el puerto que utiliza tu aplicación Spring Boot
EXPOSE 8080

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app/backend.jar"]
