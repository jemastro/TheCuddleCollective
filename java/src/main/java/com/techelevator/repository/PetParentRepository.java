package com.techelevator.repository;
import com.techelevator.entity.PetParent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PetParentRepository extends JpaRepository<PetParent, Integer> {
}
