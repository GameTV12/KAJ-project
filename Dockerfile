FROM maven AS build
COPY . /project
WORKDIR /project
RUN mvn clean install
RUN mvn package

FROM openjdk:8-jdk-alpine
RUN addgroup -S spring && adduser -S spring -G spring
COPY --from=build /project/target/spring-boot-epoll.jar /app.jar
ENTRYPOINT ["java","-jar","/app.jar"]