package at.implo.dto;

import at.implo.entity.Cooldown;

import javax.websocket.Session;

public record CooldownSession(Session session, Cooldown cooldown) {
}
