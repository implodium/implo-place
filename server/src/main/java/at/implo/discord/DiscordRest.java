package at.implo.discord;

import at.implo.dto.UserResponseDTO;
import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;

@Path("users")
@RegisterRestClient(configKey = "discord")
public interface DiscordRest {

    @GET
    @Path("@me")
    UserResponseDTO getUser(@HeaderParam("Authorization") String authorization);

}
