package com.techelevator.controller;

import com.techelevator.dao.AvailablePetDao;
import com.techelevator.exception.DaoException;
import com.techelevator.model.AvailablePet;
import jakarta.annotation.security.PermitAll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping( path = "/availablePets")
public class AvailablePetsController {
    private AvailablePetDao availablePetDao;

    @Autowired
    public AvailablePetsController(AvailablePetDao availablePetDao){
        this.availablePetDao = availablePetDao;
    }

    @RequestMapping(method = RequestMethod.GET)
    @PermitAll
    public List<AvailablePet> getAllPets() {
        List<AvailablePet> availablePets = new ArrayList<>();
        try {
            availablePets = availablePetDao.getAllPets();
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return availablePets;
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/{id}")
    public AvailablePet updateAvailablePets(@PathVariable Long id, @RequestBody AvailablePet pet){
        try{
            pet.setAnimalId(id);
            return availablePetDao.updatePet(pet);
        } catch (DaoException e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to update pet", e);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping(path = "/pets", consumes = "multipart/form-data")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> addPet(
            @RequestPart("data") AvailablePet petData,                          // JSON part
            @RequestPart(value = "imageUrl", required = false) MultipartFile mainImage,
            @RequestPart(value = "imageUrl1", required = false) MultipartFile extraImage1,
            @RequestPart(value = "imageUrl2", required = false) MultipartFile extraImage2
    ) {
        try {
            // Save main image if provided
            if (mainImage != null && !mainImage.isEmpty()) {
                String url = saveFile(mainImage);
                petData.setImageUrl(url);
            }

            // Save extra images if provided
            if (extraImage1 != null && !extraImage1.isEmpty()) {
                String url1 = saveFile(extraImage1);
                petData.setImageUrl1(url1);
            }

            if (extraImage2 != null && !extraImage2.isEmpty()) {
                String url2 = saveFile(extraImage2);
                petData.setImageUrl2(url2);
            }

            // Save pet to DB via DAO
            AvailablePet savedPet = availablePetDao.addPet(petData);

            return ResponseEntity.ok(savedPet);

        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save uploaded files", e);
        } catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to save pet", e);
        }
    }



    @GetMapping("/addOrUpdatePets")
    @PreAuthorize("isAuthenticated()")
    public List<AvailablePet> getAllPetsForUpdates() {
        List<AvailablePet> availablePets = new ArrayList<>();
        try {
            availablePets = availablePetDao.getAllPetsForUpdates();
        }
        catch (DaoException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
        return availablePets;
    }

    private static final String UPLOAD_DIR = "uploads/";

    private String saveFile(MultipartFile file) throws IOException {
        // Make folder if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate a unique filename
        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);

        // Save the file to disk
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        // Return the URL/path for frontend
        return "/" + UPLOAD_DIR + filename;
    }

}
