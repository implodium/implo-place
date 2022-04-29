package at.implo.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import java.io.Serializable;


@AllArgsConstructor
@NoArgsConstructor
public @Embeddable class CellId implements Serializable {

    @Getter
    int x;
    @Getter int y;

    @ManyToOne
    @Getter Board board;


}
