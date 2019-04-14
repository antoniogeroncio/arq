package br.ufal.ic.arq.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A FeedBack.
 */
@Entity
@Table(name = "feed_back")
public class FeedBack implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "grade", nullable = false)
    private Double grade;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne
    @JsonIgnoreProperties("feedBacks")
    private UserSocial user;

    @ManyToOne
    @JsonIgnoreProperties("feedBacks")
    private Project projetc;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getGrade() {
        return grade;
    }

    public FeedBack grade(Double grade) {
        this.grade = grade;
        return this;
    }

    public void setGrade(Double grade) {
        this.grade = grade;
    }

    public String getDescription() {
        return description;
    }

    public FeedBack description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserSocial getUser() {
        return user;
    }

    public FeedBack user(UserSocial userSocial) {
        this.user = userSocial;
        return this;
    }

    public void setUser(UserSocial userSocial) {
        this.user = userSocial;
    }

    public Project getProjetc() {
        return projetc;
    }

    public FeedBack projetc(Project project) {
        this.projetc = project;
        return this;
    }

    public void setProjetc(Project project) {
        this.projetc = project;
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
        FeedBack feedBack = (FeedBack) o;
        if (feedBack.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), feedBack.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "FeedBack{" +
            "id=" + getId() +
            ", grade=" + getGrade() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
