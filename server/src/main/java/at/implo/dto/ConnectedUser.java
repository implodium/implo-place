package at.implo.dto;

public record ConnectedUser(String id, String username, String discriminator, boolean isDisconnect) {
}
