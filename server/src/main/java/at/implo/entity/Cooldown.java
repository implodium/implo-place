package at.implo.entity;

import at.implo.dto.CooldownDTO;
import at.implo.lambda.CooldownSubscribeCallBack;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
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
    private List<CooldownSubscribeCallBack> subscriber = new ArrayList<>();

    @Transient
    public void decrement() {
        if (isActive()) {
            if (this.minutes == 0 && this.seconds == 0) {
                finish();
                return;
            }

            if (this.seconds == 0) {
                minutes--;
                seconds = 60;
            } else {
                seconds--;
            }
        }
    }

    @Transient
    public void activate(int minutes, int seconds) {
        active = true;
        this.minutes = minutes;
        this.seconds = seconds;
        notifySubscriber();
    }

    @Transient
    public void subscribe(CooldownSubscribeCallBack callBack) {
        subscriber.add(callBack);
    }

    @Transient
    private void finish() {
        this.active = false;
        notifySubscriber();
    }

    @Transient
    private void notifySubscriber() {
        System.out.println("Subscriber Count:" + subscriber.size());
        for (CooldownSubscribeCallBack cooldownSubscribeCallBack : subscriber) {
            cooldownSubscribeCallBack.callback();
        }
    }

    @Transient
    public CooldownDTO produceDTO() {
        return new CooldownDTO(
                this.getMinutes(),
                this.getSeconds(),
                this.isActive(),
                false
        );
    }

}
