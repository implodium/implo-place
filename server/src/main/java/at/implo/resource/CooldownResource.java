package at.implo.resource;

import at.implo.control.CooldownController;
import at.implo.control.DiscordController;
import at.implo.control.UserController;
import lombok.val;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("cooldown")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class CooldownResource {

    @Inject
    CooldownController cooldownController;

    @Inject
    DiscordController discordController;

    @Inject
    UserController userController;

    @POST
    @Path("set-cooldown")
    public Response setCooldown(@QueryParam("token") String token) {
        if (token != null) {
            cooldownController.setCooldown(token);
            return Response.ok().build();
        } else {
            return tokenNotProvided();
        }
    }

    static Response tokenNotProvided() {
        return Response.notAcceptable(null)
                .entity("token query parameter required")
                .build();
    }

}
