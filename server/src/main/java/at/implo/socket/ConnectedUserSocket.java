package at.implo.socket;

import at.implo.control.UserController;
import at.implo.dto.ConnectedUser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.val;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ApplicationScoped
@ServerEndpoint("/connected-user/{token}")
public class ConnectedUserSocket {
    private final Map<String, Session> sessions = new ConcurrentHashMap<>();

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final Map<String, ConnectedUser> connectedUsers = new ConcurrentHashMap<>();

    @Inject
    UserController userController;

    @OnOpen
    void openSocket(Session session, @PathParam("token") String token) {
        this.sessions.put(session.getId(), session);
        System.out.printf("new user connected, current User : %d \n", sessions.size());
    }

    @OnMessage
    @Transactional
    void connectUser(Session session, String request, @PathParam("token") String token) {
        try {
            System.out.println(token);
            val user = this.userController.register(token);
            val isAlreadyConnected = this.connectedUsers.values().stream()
                    .anyMatch(connectedUser -> connectedUser.id().equals(user.getId()));

            if (!isAlreadyConnected) {
                val connectedUser = new ConnectedUser(
                        user.getId(),
                        user.getDisplayName(),
                        user.getDiscriminator(),
                        false
                );

                connectedUsers.values().forEach(connectedUserEntry -> {
                    sendToSession(session, connectedUserEntry);
                });

                this.connectedUsers.put(user.getId(), connectedUser);
                System.out.println("broadcasting new user to clients");
                broadcast(connectedUser);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @OnClose
    @Transactional
    void disconnect(Session session, @PathParam("token") String token) {
        val registeredUser = userController.register(token);
        this.connectedUsers.remove(registeredUser.getId());
        broadcast(new ConnectedUser(
                registeredUser.getId(),
                registeredUser.getDisplayName(),
                registeredUser.getDiscriminator(),
                true)
        );

        sessions.remove(session.getId());
    }

    void broadcast(Object message) {
        try {
            val jsonString = objectMapper.writeValueAsString(message);
            System.out.printf("broadcasting to %d clients \n", sessions.size());
            sessions.values().forEach(session -> {
                session.getAsyncRemote().sendObject(jsonString);
            });
        } catch (JsonProcessingException exception) {
            exception.printStackTrace();
        }

    }

    void sendToSession(Session session, Object object) {
        try {
            val jsonString = objectMapper.writeValueAsString(object);
            session.getAsyncRemote().sendObject(jsonString);
        } catch (JsonProcessingException exception) {
            exception.printStackTrace();
        }
    }
}
