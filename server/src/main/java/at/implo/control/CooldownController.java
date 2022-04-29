package at.implo.control;

import at.implo.dao.CooldownDao;
import at.implo.dao.UserDao;
import at.implo.entity.Cooldown;
import at.implo.entity.User;
import io.quarkus.runtime.StartupEvent;
import io.quarkus.scheduler.Scheduled;
import lombok.Getter;
import lombok.val;

import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.event.Observes;
import javax.inject.Inject;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class CooldownController {


    private final int defaultMinutes = 0;
    private final int defaultSeconds = 30;

    @Getter
    private List<Cooldown> cooldowns = new ArrayList<>();

    @Inject CooldownDao dao;

    @Inject UserDao userDao;

    @Inject
    DiscordController discordController;

    void init(@Observes StartupEvent event) {
        loadCooldowns();
    }

    public void setCooldown(String token) {
        val cooldown = getCooldownWith(token).orElseThrow();
        cooldown.activate(defaultMinutes, defaultSeconds);
    }

    @Scheduled(every = "10s")
    @Transactional
    public void persist() {
        cooldowns.forEach(this.dao::save);
    }

    @Scheduled(every = "1s")
    public void decrement() {
        cooldowns.forEach(Cooldown::decrement);
    }

    public Optional<Cooldown> getCooldownWith(String token) {
        val userResponse = discordController.getUserByToken(token);
        return findCooldownByUserId(userResponse.id());
    }

    private Optional<Cooldown> findCooldownByUserId(String id) {
        return findLoadedCooldown(id);
    }

    private Optional<Cooldown> findLoadedCooldown(String id) {
        val optional = cooldowns.stream()
                .filter(cooldown -> cooldown
                    .getUser()
                    .getId()
                    .equals(id))
                .findFirst();

        System.out.println("ispresent: " + optional.isPresent());

        return optional;
    }

    public void loadCooldowns() {
        this.cooldowns = dao.loadCooldowns();
        System.out.println("loading cooldowns");
        System.out.println(cooldowns.size());
    }

    public void loadCooldown(Cooldown cooldown) {
        if (loadedNotContains(cooldown)) {
            System.out.println("updating cooldowns");
            cooldowns.add(cooldown);
        }
        System.out.println(cooldowns.size());
    }

    public boolean loadedNotContains(Cooldown cooldown) {
        val distinctCount = cooldowns.stream()
                .filter(cooldownEntry -> cooldownEntry
                        .getId()
                        .equals(cooldown.getId())
                )
                .count();

        return distinctCount == 0;
    }
}
