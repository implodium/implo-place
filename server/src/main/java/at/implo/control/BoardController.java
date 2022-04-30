package at.implo.control;

import at.implo.config.BoardConfig;
import at.implo.dao.BoardDao;
import at.implo.dao.CellDao;
import at.implo.entity.Board;
import at.implo.entity.Cell;
import io.quarkus.runtime.StartupEvent;
import lombok.val;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class BoardController {

    @Inject
    BoardConfig boardConfig;

    @Inject
    BoardDao boardDao;

    @Inject
    CellDao cellDao;

    @Transactional
    void init(@Observes StartupEvent event) {
        val boardId = findBoardOrCreate().getId();
        System.out.println("Loaded Board " + boardId);
    }

    @Transactional
    public Cell saveCell(Cell cell) {
        return cellDao.save(cell);
    }

    private Board findBoardOrCreate() {
        System.out.println("DINGENS");
        val boardOptional = boardDao.findByIdOptional(boardConfig.boardId());
        System.out.println("isBoardPresent: " + boardOptional.isPresent());
        return boardOptional.orElse(boardDao.save(new Board(boardConfig.boardId(),0)));
    }

    public List<Cell> findAllCells() {
        return this.cellDao.listAll();
    }
}
