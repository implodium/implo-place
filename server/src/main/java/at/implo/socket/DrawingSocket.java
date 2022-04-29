package at.implo.socket;

import at.implo.control.BoardController;
import at.implo.control.CooldownController;
import at.implo.control.UserController;
import at.implo.dao.UserDao;
import at.implo.entity.Board;
import at.implo.entity.Cell;
import at.implo.dto.DrawRequest;
import at.implo.dto.DrawResponse;
import at.implo.entity.CellId;
import at.implo.entity.User;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.smallrye.common.annotation.Blocking;
import io.smallrye.mutiny.Uni;
import lombok.val;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/drawing-socket/{token}")
@ApplicationScoped
public class DrawingSocket {

    private final Map<String, Session> sessions = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Inject
    CooldownController cooldownController;

    @Inject
    UserController userController;

    @Inject
    BoardController boardController;

    @OnOpen
    void openSocket(Session session) {
        this.sessions.put(session.getId(), session);
        System.out.println("sessions: " + sessions.size());
    }

    @OnMessage
    void messageTo(Session session, String request, @PathParam("token") String token) {
        val drawRequest = tryParseRequest(request).orElseThrow();
        val cooldownOptional = cooldownController.getCooldownWith(token);
        val user = userController.register(token);

        cooldownOptional.ifPresent(cooldown -> {
            if (!cooldown.isActive()) {
                val identifier = drawRequest.cell().getId();
                val updatedCell = new Cell(
                        new CellId(identifier.getX(), identifier.getY(), identifier.getBoard()),
                        user,
                        drawRequest.color()
                );

                boardController.saveCell(updatedCell);
                broadcast(new DrawResponse(true, updatedCell));
                cooldownController.setCooldown(token);
            } else {
                sendTo(session, new DrawResponse(false, null));
            }
        });
    }

    private Optional<DrawRequest> tryParseRequest(String request) {
        try {
            return Optional.of(objectMapper.readValue(request, DrawRequest.class));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    void broadcast(Object message) {
        try {
            val jsonString = objectMapper.writeValueAsString(message);
            sessions.values().forEach(session -> {
                session.getAsyncRemote().sendObject(jsonString);
                System.out.println(session.getId());
            });
        } catch (JsonProcessingException exception) {
            exception.printStackTrace();
        }

    }

    void sendTo(Session session, Object message) {
        session.getAsyncRemote().sendObject(message);
    }
}
