package br.ufal.ic.arq.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

import br.ufal.ic.arq.domain.enumeration.Rating;

/**
 * A Catalog.
 */
@Entity
@Table(name = "catalog")
public class Catalog implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "rating", nullable = false)
    private Rating rating;

    @ManyToOne
    @JsonIgnoreProperties("catalogs")
    private Project projetc;

    @ManyToOne
    @JsonIgnoreProperties("catalogs")
    private UserSocial user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Rating getRating() {
        return rating;
    }

    public Catalog rating(Rating rating) {
        this.rating = rating;
        return this;
    }

    public void setRating(Rating rating) {
        this.rating = rating;
    }

    public Project getProjetc() {
        return projetc;
    }

    public Catalog projetc(Project project) {
        this.projetc = project;
        return this;
    }

    public void setProjetc(Project project) {
        this.projetc = project;
    }

    public UserSocial getUser() {
        return user;
    }

    public Catalog user(UserSocial userSocial) {
        this.user = userSocial;
        return this;
    }

    public void setUser(UserSocial userSocial) {
        this.user = userSocial;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Catalog catalog = (Catalog) o;
        if (catalog.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), catalog.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Catalog{" +
            "id=" + getId() +
            ", rating='" + getRating() + "'" +
            "}";
    }
}
