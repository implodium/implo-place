package at.implo.dao;

import at.implo.entity.Board;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class BoardDao implements DataBaseDao<Long, Board> {
}
