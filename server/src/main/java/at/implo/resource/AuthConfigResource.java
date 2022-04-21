package at.implo.resource;

import at.implo.config.AuthConfig;
import at.implo.dto.AuthConfigDTO;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

@Produces(MediaType.APPLICATION_JSON)
@Path("config")
public class AuthConfigResource {

    @Inject
    AuthConfig authConfig;

    @GET
    public AuthConfigDTO get() {
        final var config = new AuthConfigDTO(this.authConfig.redirectUrl());
        return config;
    }
}
