FROM amazoncorretto:17-alpine
WORKDIR /app
COPY target/java-web-service-0.0.1-SNAPSHOT.jar /app/app.jar
ENTRYPOINT [ "java","-jar", "app.jar" ]

