package at.implo.config;

import io.smallrye.config.ConfigMapping;

@ConfigMapping(prefix = "auth")
public interface AuthConfig {
    String redirectUrl();
}
