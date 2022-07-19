package com.store.store.Controller;

import com.store.store.Dao.InventoryDao;
import com.store.store.Model.Inventory;
import com.store.store.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class InventoryController {

    @Autowired
    private InventoryDao inventoryDao;

    @Autowired
    private JWTUtil jwtUtil;

    // getInventory to be able to be seen from tab
    @RequestMapping(value ="api/inventory",  method = RequestMethod.GET)
        public List<Inventory> getInventory(@RequestHeader(value = "Authorization") String token ){

        if(!validateToken(token)){
            return null;
        }
        return inventoryDao.getInventory();
    }

    private boolean validateToken(String token){
        String userId = jwtUtil.getKey(token);
        return userId != null;
    }

    // Delete items(deactivate items)
    @RequestMapping(value ="api/inventory/{id}",  method = RequestMethod.DELETE)
    public void disableItem(@RequestHeader(value = "Authorization") String token,
                           @PathVariable Long id){
        if(!validateToken(token)){
            return ;
        }
        inventoryDao.disableItem(id);
    }

    // Enable items
    @RequestMapping(value ="api/inventory/{id}", method = RequestMethod.PUT)
    public void enableItem(@RequestHeader(value = "Authorization") String token,
                           @PathVariable Long id){
        if(!validateToken(token)){
            return ;
        }
        inventoryDao.enableItem(id);
    }


    @RequestMapping(value ="api/inventory/reorder/{id}", method = RequestMethod.PUT)
    public void requestMoreInventory(@RequestHeader(value = "Authorization") String token,
                           @PathVariable Long id){
        if(!validateToken(token)){
            return ;
        }
        inventoryDao.requestMoreInventory(id);
    }

/*
    // Add User
    @RequestMapping(value ="api/users", method = RequestMethod.POST)
    public void registerUser(@RequestBody User user){
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 2048, 1 ,  user.getPassword());
        user.setPassword(hash);

        userDao.register(user);
    }
    //
*/

}
