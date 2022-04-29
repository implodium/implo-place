package at.implo.config;

import io.smallrye.config.ConfigMapping;

@ConfigMapping(prefix = "board")
public interface BoardConfig {

    Long boardId();

}
