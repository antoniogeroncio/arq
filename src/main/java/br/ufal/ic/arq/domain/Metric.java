package br.ufal.ic.arq.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Metric.
 */
@Entity
@Table(name = "metric")
public class Metric implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Version version;

    @ManyToOne
    @JsonIgnoreProperties("metrics")
    private Project project;

    @ManyToOne
    @JsonIgnoreProperties("metrics")
    private UserSocial user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Version getVersion() {
        return version;
    }

    public Metric version(Version version) {
        this.version = version;
        return this;
    }

    public void setVersion(Version version) {
        this.version = version;
    }

    public Project getProject() {
        return project;
    }

    public Metric project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public UserSocial getUser() {
        return user;
    }

    public Metric user(UserSocial userSocial) {
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
        Metric metric = (Metric) o;
        if (metric.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), metric.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Metric{" +
            "id=" + getId() +
            "}";
    }
}
