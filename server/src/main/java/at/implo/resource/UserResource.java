package at.implo.resource;

import at.implo.control.UserController;
import at.implo.control.DiscordController;
import at.implo.dto.ChangeNameRequest;
import lombok.val;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("user")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    @Inject
    DiscordController discordController;

    @Inject
    UserController userController;

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
        val user = this.userController.register(userResponse);
        return Response.ok(user).build();
    }

    @POST
    @Path("change-name")
    public Response changeName(@QueryParam("token") String token, ChangeNameRequest request) {
        if (token != null) {
            val userResponse = discordController.getUserByToken(token);
            val user = userController.changeName(request.newName(), userResponse);

            return Response.ok(user)
                    .build();
        } else {
            return UserResource.tokenNotProvided();
        }
    }
}
