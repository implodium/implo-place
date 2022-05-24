FROM maven:3.8.5-openjdk-17 as build

WORKDIR /app/

COPY pom.xml ./

RUN mvn clean install

COPY . .

RUN mvn -Dquarkus.package.type=uber-jar -DskipTests verify

FROM openjdk:17-slim

COPY --from=build /app/target/*-runner.jar application.jar

ENTRYPOINT ["java", "-jar", "application.jar"]