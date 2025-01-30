package com.example.task2.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    private String id;
    private String username;
    private String password;
    private String role;
    private boolean flag;

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public String getId() {
        return id;  // Get the ID as a String
    }

    public void setId(String id) {
        this.id = id;  // Set the ID as a String
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // Constructor to initialize all fields, including ID as a String
    public User(String id, String username, String password, String role, boolean flag) {
        this.id = id;  // Use String for ID
        this.username = username;
        this.password = password;
        this.role = role;
        this.flag = flag;
    }

    // Default constructor to generate a new ID automatically if needed
    public User(String username, String password, String role, boolean flag) {
        this.id = java.util.UUID.randomUUID().toString();  // Generate UUID as String
        this.username = username;
        this.password = password;
        this.role = role;
        this.flag = flag;
    }
    public User() {

    }
    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
