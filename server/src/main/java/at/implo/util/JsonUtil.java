package at.implo.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class JsonUtil {

    private final ObjectMapper objectMapper = new ObjectMapper();

    public String stringify(Object object) throws JsonProcessingException {
        return objectMapper.writeValueAsString(object);
    }

}
