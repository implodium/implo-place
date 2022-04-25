package at.implo.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "PUSER")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id @Getter private String id;

    @Getter private String displayName;

    @Getter private String discriminator;

    @Getter private boolean displayNameOverwrite;

}
