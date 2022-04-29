package at.implo.socket;

import at.implo.control.CooldownController;
import at.implo.dto.CooldownDTO;
import at.implo.dto.CooldownSession;
import at.implo.entity.Cooldown;
import at.implo.util.JsonUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.val;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@ServerEndpoint("/cooldown-socket/{token}")
@ApplicationScoped
public class CooldownSocket {

    @Inject
    CooldownController cooldownController;

    @Inject
    JsonUtil jsonUtil;

    Map<String, Session> sessions = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session, @PathParam("token") String token) {
        sessions.put(session.getId(), session);
    }

    @OnMessage
    public void onMessage(Session session, String action, @PathParam("token") String token) {
        if ("cooldown".equals(action)) {
            sendCooldown(token, session);
        }
    }

    private void sendCooldown(String token, Session session) {
        val cooldownOptional = cooldownController.getCooldownWith(token);
        cooldownOptional.ifPresentOrElse(cooldown -> {
            sendJson(cooldown.produceDTO(), session);
            cooldown.subscribe(() -> sendJson(cooldown.produceDTO(), session));
        }, () -> sendJson(errorDTO(), session));
    }

    private void broadcast(String message) {
        sessions.values().forEach(s -> s.getAsyncRemote().sendObject(message, sendResult -> {
            if (sendResult.getException() != null) {
                sendResult.getException().printStackTrace();
            }
        }));
    }

    private void sendJson(Object message, Session session) {
        try {
            session.getAsyncRemote().sendObject(jsonUtil.stringify(message));
        } catch (JsonProcessingException e) {
            session.getAsyncRemote().sendObject("error");
        }
    }

    static CooldownDTO errorDTO() {
        return new CooldownDTO(
                0,
                0,
                false,
                true
        );
    }
}
