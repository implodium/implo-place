package at.implo.resource;

import at.implo.control.AuthController;
import at.implo.control.DiscordController;
import at.implo.rest.DiscordRest;
import lombok.val;
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

    @Inject
    AuthController authController;

    @POST
    @Path("register")
    public Response register(@QueryParam("token") String token) {
        if (token == null) {
            return tokenNotProvided();
        } else {
            return registerUser(token);
        }
    }

    static Response tokenNotProvided() {
        return Response.notAcceptable(null)
                .entity("token query parameter required")
                .build();
    }

    Response registerUser(String token) {
        val userResponse = this.discordController.getUserByToken(token);
        val user = this.authController.register(userResponse);
        return Response.ok(user).build();
    }

}
