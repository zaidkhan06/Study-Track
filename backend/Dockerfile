# Use official OpenJDK image as base
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy target jar to container
COPY target/StudyTrackBackend-0.0.1-SNAPSHOT.jar app.jar

# Expose port (same as Spring Boot runs on)
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
