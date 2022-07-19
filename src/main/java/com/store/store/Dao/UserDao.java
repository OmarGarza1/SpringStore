package com.store.store.Dao;

import com.store.store.Model.User;

import java.util.List;

public interface UserDao {

    public List<User> getUsers();

    void deleteUser(Long id);

    void enableUser(Long id);

    void register(User user);

    User getUserWithCredentials(User user);
}
