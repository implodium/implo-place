package at.implo.dao;

import at.implo.entity.User;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserDao implements DataBaseDao<String, User> {

}
