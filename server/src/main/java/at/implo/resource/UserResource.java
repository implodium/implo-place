package at.implo.resource;

import at.implo.control.CooldownController;
import at.implo.control.UserController;
import at.implo.control.DiscordController;
import at.implo.dto.ChangeNameRequest;
import at.implo.entity.User;
import lombok.val;
import org.jboss.logging.annotations.Pos;

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

    @Inject
    CooldownController cooldownController;

    @POST
    @Path("register")
    public Response registerResource(@QueryParam("token") String token) {
        if (token == null) {
            return tokenNotProvided();
        } else {
            return register(token);
        }
    }

    static Response tokenNotProvided() {
        return Response.notAcceptable(null)
                .entity("token query parameter required")
                .build();
    }

    Response register(String token) {
        val userResponse = this.discordController.getUserByToken(token);
        val user = this.userController.register(userResponse);
        cooldownController.loadCooldown(user.getCooldown());
        return Response.ok(user).build();
    }

    @POST
    @Path("change-name")
    public Response changeNameResource(@QueryParam("token") String token, ChangeNameRequest request) {
        if (token != null) {
            return changeName(token, request);
        } else {
            return UserResource.tokenNotProvided();
        }
    }

    public Response changeName(String token, ChangeNameRequest request) {
        val userResponse = discordController.getUserByToken(token);
        val user = userController.changeName(request.newName(), userResponse);

        return Response.ok(user)
                .build();
    }

    @POST
    @Path("clear-name")
    public Response clearNameResource(@QueryParam("token") String token) {
        if (token != null) {
            return clearName(token);
        } else {
            return UserResource.tokenNotProvided();
        }
    }

    private Response clearName(String token) {
        val userResponse = discordController.getUserByToken(token);
        val user = userController.clearName(userResponse);

        return Response.ok(user)
                .build();
    }

    @POST
    @Path("toggle-fastmode")
    public Response toggleFastmodeResource(@QueryParam("token") String token) {
        if (token != null) {
            return toggleFastmode(token);
        } else {
            return UserResource.tokenNotProvided();
        }
    }

    private Response toggleFastmode(String token) {
        val userResponse = discordController.getUserByToken(token);
        val user = userController.toggleFastMode(userResponse);

        return Response.ok(user)
                .build();
    }

}
