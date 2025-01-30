package com.example.task2.service;

import com.example.task2.entity.User;
import com.example.task2.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class UserService {
    @Autowired
    private UserRepository userRepository;

    //add user
    public void addUser(User user) {
        user.setFlag(true);
        userRepository.save(user);
    }

    public void savedeleteduser(User user){
        userRepository.save(user);
    }

    //show users
    public List<User> showUsers() {
        List<User> userList=userRepository.findAll();
        List<User>showlist=new ArrayList<>();
        for(int i=0;i<userList.size();i++){
            if(userList.get(i).isFlag()==true){
                showlist.add(userList.get(i));
            }
        }
        if(userList.size()==0){
            return new ArrayList<>();
        }
        return showlist;
    }

    //find user by username
    public User findUserByUsername(String username) {
        for (User user : showUsers()) {
            if (user.getUsername().equals(username)) {
                return user;
            }
        }
        return null;
    }

    public boolean checkCredential(User user, User userEntered) {
        return user.isFlag() && user.getPassword().equals(userEntered.getPassword());
    }

    public Optional<User> findUserByid(String id){
        return userRepository.findById(id);
    }
}
