# Stage 1: Build the jar using Maven
FROM maven:3.8.7-openjdk-17 AS build
WORKDIR /app

# Copy pom.xml and source code
COPY pom.xml .
COPY src ./src

# Build the project (skip tests to speed up)
RUN mvn clean package -DskipTests

# Stage 2: Create minimal runtime image
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built jar from the first stage
COPY --from=build /app/target/StudyTrackBackend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app runs on
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
