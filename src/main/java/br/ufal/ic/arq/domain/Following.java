package br.ufal.ic.arq.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Following.
 */
@Entity
@Table(name = "following")
public class Following implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties("followings")
    private UserSocial follower;

    @ManyToOne
    @JsonIgnoreProperties("followings")
    private UserSocial following;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public UserSocial getFollower() {
        return follower;
    }

    public Following follower(UserSocial userSocial) {
        this.follower = userSocial;
        return this;
    }

    public void setFollower(UserSocial userSocial) {
        this.follower = userSocial;
    }

    public UserSocial getFollowing() {
        return following;
    }

    public Following following(UserSocial userSocial) {
        this.following = userSocial;
        return this;
    }

    public void setFollowing(UserSocial userSocial) {
        this.following = userSocial;
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
        Following following = (Following) o;
        if (following.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), following.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Following{" +
            "id=" + getId() +
            "}";
    }
}
