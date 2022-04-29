package at.implo.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Transient;

@NoArgsConstructor
@AllArgsConstructor
public @Data @Entity class Board {

    @Id @Getter Long id;

    @Getter int placedPixels;

}
