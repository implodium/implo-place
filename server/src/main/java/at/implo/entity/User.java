package at.implo.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "PUSER")
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class User {

    @Id @Getter @NonNull
    private String id;

    @Getter @NonNull
    private String displayName;

    @Getter @NonNull
    private String discriminator;

    @Getter @NonNull
    private boolean displayNameOverwrite;

    @OneToOne(cascade = CascadeType.ALL) @Getter
    private Cooldown cooldown = new Cooldown(this);

    @OneToOne(cascade = CascadeType.ALL)
    @Getter private UserSetting settings = new UserSetting();
}
