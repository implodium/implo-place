package at.implo.resource;

import at.implo.control.BoardController;
import at.implo.entity.Board;
import at.implo.entity.Cell;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("board")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BoardResource {

    @Inject
    BoardController boardController;

    @GET
    @Path("cells")
    public List<Cell> findAllCells() {
        return boardController.findAllCells();
    }
}
