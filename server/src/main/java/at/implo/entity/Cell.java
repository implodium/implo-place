package at.implo.entity;


import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
public @Data @Entity class Cell {

    @EmbeddedId @Getter
    CellId id;

    @ManyToOne
    User user;

    String color;
}
