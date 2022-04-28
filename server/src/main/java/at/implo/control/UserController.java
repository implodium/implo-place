package at.implo.control;

import at.implo.dao.UserDao;
import at.implo.dto.UserResponseDTO;
import at.implo.entity.Cooldown;
import at.implo.entity.User;
import lombok.val;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;

@ApplicationScoped
public class UserController {

    @Inject
    UserDao userDao;

    @Transactional
    public User register(UserResponseDTO responseDTO) {
        try {
            return updateUser(responseDTO);
        } catch (NullPointerException exception) {
            return createNewUser(responseDTO);
        }
    }

    private User updateUser(UserResponseDTO responseDTO) {
        val currentUser = userDao.findById(responseDTO.id());
        currentUser.setDiscriminator(responseDTO.discriminator());

        if (!currentUser.isDisplayNameOverwrite()) {
            currentUser.setDisplayName(responseDTO.username());
        }

        return currentUser;
    }

    private User createNewUser(UserResponseDTO responseDTO) {
        val newUser = new User(
                responseDTO.id(),
                responseDTO.username(),
                responseDTO.discriminator(),
                false
        );

        return userDao.save(newUser);
    }

    @Transactional
    public User changeName(String newName, UserResponseDTO response) {
        val user = userDao.findById(response.id());
        user.setDisplayName(newName);
        user.setDisplayNameOverwrite(true);

        return user;
    }

    public User clearName(UserResponseDTO response) {
        val user = this.userDao.findById(response.id());
        user.setDisplayName(response.username());
        user.setDisplayNameOverwrite(false);

        return user;
    }
}
