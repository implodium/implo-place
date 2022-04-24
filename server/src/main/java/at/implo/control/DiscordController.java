package at.implo.control;

import at.implo.dto.UserResponseDTO;
import at.implo.rest.DiscordRest;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;

@ApplicationScoped
public class DiscordController {

    @Inject
    @RestClient
    DiscordRest rest;

    public UserResponseDTO getUserByToken(String token) {
        return rest.getUserByToken("Bearer " + token);
    }

}
