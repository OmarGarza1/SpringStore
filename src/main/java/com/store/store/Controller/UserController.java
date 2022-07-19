package com.store.store.Controller;

import com.store.store.Dao.UserDao;
import com.store.store.Model.User;
import com.store.store.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
public class UserController  {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;
/*
    @RequestMapping(value ="api/user/{id}")
    public User getUser(@PathVariable Long id){
        User user = new User();
        user.setUserId(id);
        user.setName("Omar");
        user.setEmail("omar@hotmail.com");
        user.setPassword("miau");
        user.setPhoneNumber("12456589");
        return user;
    }
*/
    // GetUsers to be able to be seen from table tab
    @RequestMapping(value ="api/users",  method = RequestMethod.GET)
        public List<User> getUsers(@RequestHeader(value = "Authorization") String token ){

        if(!validateToken(token)){
            return null;
        }
        return userDao.getUsers();
    }

    private boolean validateToken(String token){
        String userId = jwtUtil.getKey(token);
        return userId != null;
    }

    // Delete Users(deactivate users)
    @RequestMapping(value ="api/users/{id}",  method = RequestMethod.DELETE)
    public void deleteUser(@RequestHeader(value = "Authorization") String token,
                           @PathVariable Long id){
        if(!validateToken(token)){
            return ;
        }
         userDao.deleteUser(id);
    }

    // Enable Users
    @RequestMapping(value ="api/users/{id}", method = RequestMethod.PUT)
    public void enableUser(@RequestHeader(value = "Authorization") String token,
                           @PathVariable Long id){
        if(!validateToken(token)){
            return ;
        }
        userDao.enableUser(id);
    }

    // Add User
    @RequestMapping(value ="api/users", method = RequestMethod.POST)
    public void registerUser(@RequestBody User user){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 2048, 1 ,  user.getPassword());
        user.setPassword(hash);

        userDao.register(user);
    }
    //


}
