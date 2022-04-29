package at.implo.dao;

import at.implo.entity.Cell;
import at.implo.entity.CellId;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CellDao implements DataBaseDao<CellId, Cell> {
}
