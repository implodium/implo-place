package at.implo.entity;

import at.implo.dto.CooldownDTO;
import at.implo.lambda.CooldownSubscribeCallBack;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@RequiredArgsConstructor
public @Data @Entity class Cooldown {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter private Long id;

    @Getter
    private int minutes = 0;

    @Getter
    private int seconds = 0;

    @Getter
    private boolean active = false;

    @Getter
    @NonNull
    @JsonIgnore
    @OneToOne(mappedBy = "cooldown")
    private User user;

    @Transient
    private List<CooldownSubscribeCallBack> subscriber;

    @Transient
    public void decrement() {
        if (this.minutes == 0 && this.seconds == 0) {
            finish();
            return;
        }

        if (this.seconds == 0) {
            minutes--;
        } else {
            seconds--;
        }
    }

    @Transient
    public void activate(int minutes, int seconds) {
        active = true;
        this.minutes = minutes;
        this.seconds = seconds;
    }

    @Transient
    public void subscribe(CooldownSubscribeCallBack callBack) {
        subscriber.add(callBack);
    }

    @Transient
    private void finish() {
        this.active = false;
        notifyFinish();
    }

    @Transient
    private void notifyFinish() {
        subscriber.forEach(CooldownSubscribeCallBack::callback);
    }

    @Transient
    public CooldownDTO produceDTO() {
        return new CooldownDTO(
                this.getMinutes(),
                this.getSeconds(),
                this.isActive()
        );
    }

}
