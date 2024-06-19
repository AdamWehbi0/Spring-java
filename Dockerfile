# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-oracle

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml to the container
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Install project dependencies
RUN ./mvnw dependency:resolve

# Copy the rest of the application code
COPY src ./src

# Build the application
RUN ./mvnw package

# Copy the built JAR file to the correct location
COPY target/*.jar app.jar

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
