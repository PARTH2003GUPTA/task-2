package com.example.task2.controller;

import com.example.task2.entity.User;
import com.example.task2.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<String> adduser(@RequestBody User user){
        try {
            user.setId(UUID.randomUUID().toString());
            userService.addUser(user);
            return new ResponseEntity<>("User added ",HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>("user not added  "+ e.getMessage(),HttpStatus.BAD_REQUEST);

        }
    }

    @GetMapping
    public ResponseEntity<List<User>> showAlluser(){
        try {
            return new ResponseEntity<>(userService.showUsers(),HttpStatus.OK);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        }
    }

    //login-->
    @PostMapping("login")
    public ResponseEntity<String> loginUser(@RequestBody User user) {
        try {
            User user1 = userService.findUserByUsername(user.getUsername());
            if (user1 == null) {
                return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
            }

            boolean isValid = userService.checkCredential(user1, user);
            if (isValid) {
                return new ResponseEntity<>("Successfully logged in", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Invalid credentials or access denied", HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Error processing login", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("update")
    public ResponseEntity<String> updateUser(@RequestBody User user){
        Optional<User> olduser=userService.findUserByid(user.getId());
        if(olduser.isPresent()) {
            olduser.get().setPassword(user.getPassword());
            olduser.get().setUsername(user.getUsername());
            olduser.get().setRole(user.getRole());
            userService.addUser(olduser.orElse(null));
            return new ResponseEntity<>("updated user", HttpStatus.OK);
        }
        return new ResponseEntity<>("no user found",HttpStatus.NOT_FOUND);
    }

    @PostMapping("delete")
    public ResponseEntity<String> deleteUser(@RequestBody User user){
        Optional<User> olduser=userService.findUserByid(user.getId());
        if(olduser.isPresent()) {
            olduser.get().setPassword(user.getPassword());
            olduser.get().setUsername(user.getUsername());
            olduser.get().setRole(user.getRole());
            olduser.get().setFlag(false);
            userService.savedeleteduser(olduser.orElse(null));
            return new ResponseEntity<>("deleted the  user", HttpStatus.OK);
        }
        return new ResponseEntity<>("no user found",HttpStatus.NOT_FOUND);
    }

}
