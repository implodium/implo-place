package at.implo.resource;

import at.implo.control.DiscordController;
import at.implo.rest.DiscordRest;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthResource {

    @Inject
    DiscordController discordController;

    @POST
    @Path("register")
    public Response register(@QueryParam("token") String token) {
        if (token == null) {
            return Response.notAcceptable(null)
                    .entity("token query parameter required")
                    .build();
        } else {
            final var user = this.discordController.getUserByToken(token);
            return Response.ok(user).build();
        }
    }

}
