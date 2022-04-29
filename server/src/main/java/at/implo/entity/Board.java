package at.implo.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;

@RequiredArgsConstructor
@NoArgsConstructor
public @Data @Entity class Board {

    @Id @Getter
    @NonNull Long id;

    @Getter int placedPixels = 0;

}
