package at.implo.dto;

public record CooldownDTO(
        int minutes,
        int seconds,
        boolean active,
        boolean error
) { }
