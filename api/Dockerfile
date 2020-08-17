FROM maven:3.5-jdk-8-alpine as build
WORKDIR /app

COPY mvnw .
COPY pom.xml .

COPY src src

RUN mvn clean package -DskipTests
RUN mkdir -p target/dependency && (cd target/dependency; jar -xf ../*.jar)

FROM openjdk:8-jdk-alpine
VOLUME /tmp
ARG DEPENDENCY=/app/target

COPY --from=build ${DEPENDENCY}/gestao-processos-0.0.1-SNAPSHOT.jar gestao-processos-0.0.1-SNAPSHOT.jar
COPY --from=build ${DEPENDENCY}/classes /app

ENTRYPOINT ["java", "-cp","app:app/*", "-jar", "/gestao-processos-0.0.1-SNAPSHOT.jar"]
