package com.tfg.bookmanagerrmh2.repository;

import com.tfg.bookmanagerrmh2.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
