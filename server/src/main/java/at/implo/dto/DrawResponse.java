package at.implo.dto;

import at.implo.entity.Cell;

public record DrawResponse(boolean isAllowed, Cell updatedCell) { }
