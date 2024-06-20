# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-oracle

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml to the container
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Grant execute permissions on the Maven wrapper
RUN chmod +x mvnw

# Install project dependencies and build the application, skipping tests
COPY src ./src
RUN ./mvnw clean package -DskipTests

# Copy the built JAR file to the correct location
RUN ls target # Add this line to check the contents of the target directory
COPY target/*.jar app.jar

# Make port 8080 available to the world outside this container
EXPOSE 8080

ENV SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/student
ENV SPRING_DATASOURCE_USERNAME=postgres
ENV SPRING_DATASOURCE_PASSWORD=Adam1218
# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
