package com.codegym.restaurant.properties;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"com.codegym.restaurant"})
@EntityScan("com.codegym.restaurant.model")
@EnableJpaRepositories("com.codegym.restaurant.repository")
@ConfigurationProperties(prefix = "file")
public class FileStorageProperties {
    private String uploadDir;
    public String getUploadDir() {
        return uploadDir;
    }
    public void setUploadDir(String uploadDir) {
        this.uploadDir = uploadDir;
    }
}
