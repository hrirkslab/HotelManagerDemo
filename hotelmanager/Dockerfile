FROM openjdk:17-jdk-slim as build

VOLUME /tmp

EXPOSE 8080

ARG WAR_FILE=target/*.war

ADD ${WAR_FILE} app.war

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.war"]