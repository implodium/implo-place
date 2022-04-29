package at.implo.socket;

import at.implo.control.CooldownController;
import at.implo.dto.Cell;
import at.implo.dto.DrawRequest;
import at.implo.dto.DrawResponse;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.val;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/drawing-socket/{token}")
@ApplicationScoped
public class DrawingSocket {

    private Map<String, Session> sessions = new ConcurrentHashMap<>();
    private ObjectMapper objectMapper = new ObjectMapper();

    @Inject
    CooldownController cooldownController;

    @OnOpen
    void openSocket(Session session) {
        this.sessions.put(session.getId(), session);
        System.out.println("sessions: " + sessions.size());
    }

    @OnMessage
    void messageTo(Session session, String request, @PathParam("token") String token) throws JsonProcessingException {
        final DrawRequest drawRequest = objectMapper.readValue(request, DrawRequest.class);
        val cooldownOptional = cooldownController.getCooldownWith(token);

        cooldownOptional.ifPresent(cooldown -> {
            if (!cooldown.isActive()) {
                val updatedCell = new Cell(
                        drawRequest.cell().x(),
                        drawRequest.cell().y(),
                        drawRequest.color()
                );

                broadcast(new DrawResponse(true, updatedCell));
            } else {
                sendTo(session, new DrawResponse(false, null));
            }
        });
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
