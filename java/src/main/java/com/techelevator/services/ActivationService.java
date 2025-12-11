package com.techelevator.services;

import com.techelevator.dao.VolunteerDao;
import com.techelevator.model.ShelterVolunteer;
import org.springframework.stereotype.Service;

@Service
public class ActivationService {

    private final VolunteerDao volunteerDao;
    private final PasswordService passwordService;

    public ActivationService(VolunteerDao volunteerDao, PasswordService passwordService) {
        this.volunteerDao = volunteerDao;
        this.passwordService = passwordService;
    }

    public boolean isFirstTimeLogin(ShelterVolunteer vol) {
        return vol.isFirstLogin() && vol.isTempPasswordActive();
    }

    public boolean verifyTempPassword(ShelterVolunteer vol, String rawPassword) {
        return passwordService.verifyPassword(rawPassword, vol.getPasswordHash());
    }

    public void activateAccount(ShelterVolunteer vol, String newPassword) {
        vol.setPasswordHash(passwordService.hashPassword(newPassword));
        vol.setFirstLogin(false);
        vol.setTempPasswordActive(false);

        volunteerDao.update(vol);
    }
}