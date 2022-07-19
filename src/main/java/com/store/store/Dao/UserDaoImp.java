package com.store.store.Dao;

import com.store.store.Model.User;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Date;
import java.util.List;

@Repository
@Transactional
public class UserDaoImp implements UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public List getUsers() {
        String query = "FROM User";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void deleteUser(Long id) {
        // to Disable User from db
        User user = entityManager.find(User.class, id);
        user.setUserActive(false);
        user.setEndDate(new Date());
        entityManager.persist(user);

       // To delete completely from db
       //entityManager.remove(user);
    }

    @Override
    public void enableUser(Long id) {
        User user = entityManager.find(User.class, id);
        user.setUserActive(true);
        user.setEndDate(null);
        entityManager.persist(user);
    }

    @Override
    public void register(User user) {
        entityManager.merge(user);
    }

    @Override
    public User getUserWithCredentials(User user) {
        // Refering to class user
        String query = "FROM User where email = :email";
        List<User> list = entityManager.createQuery(query)
                .setParameter("email", user.getEmail())
                .getResultList();

        if (list.isEmpty()){
            return null;
        }

        String passwordHashed = list.get(0).getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if( argon2.verify(passwordHashed, user.getPassword())){
            return list.get(0);
        }
        return null;


    }


}
