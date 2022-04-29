package at.implo.config;

import io.smallrye.config.ConfigMapping;

import javax.resource.spi.ConfigProperty;

@ConfigMapping(prefix = "cooldown")
public interface CooldownConfig {

    int minutes();

    int seconds();

}
