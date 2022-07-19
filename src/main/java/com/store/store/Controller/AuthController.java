package com.store.store.Controller;

import com.store.store.Dao.UserDao;
import com.store.store.Model.User;
import com.store.store.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value ="api/login", method = RequestMethod.POST)
    public String login(@RequestBody User user){

        User loggedUser = userDao.getUserWithCredentials(user);
        if(loggedUser != null){

            return jwtUtil.create(String.valueOf(loggedUser.getUserId()),loggedUser.getEmail());

        }
        return "False";
    }




}
