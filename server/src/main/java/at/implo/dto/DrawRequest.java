package at.implo.dto;

import at.implo.entity.Cell;

public record DrawRequest(String color, Cell cell) {
}
