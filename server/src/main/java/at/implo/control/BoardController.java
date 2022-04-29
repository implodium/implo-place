package at.implo.control;

import at.implo.config.BoardConfig;
import at.implo.dao.BoardDao;
import at.implo.entity.Board;
import io.quarkus.runtime.StartupEvent;
import javassist.NotFoundException;
import lombok.val;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.transaction.Transactional;

@ApplicationScoped
public class BoardController {

    @Inject
    BoardConfig boardConfig;

    @Inject
    BoardDao boardDao;

    @Transactional
    void init(@Observes StartupEvent event) {
        val boardId = boardDao.findByIdOptional(boardConfig.boardId())
                .orElse(boardDao.save(new Board(boardConfig.boardId())))
                .getId();

        System.out.println("Loaded Board " + boardId);
    }

}
