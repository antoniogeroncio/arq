package br.ufal.ic.arq.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Message.
 */
@Entity
@Table(name = "message")
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    @NotNull
    @Column(name = "send_date", nullable = false)
    private LocalDate sendDate;

    @ManyToOne
    @JsonIgnoreProperties("messages")
    private UserSocial sender;

    @ManyToOne
    @JsonIgnoreProperties("messages")
    private UserSocial recipient;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public Message description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getSendDate() {
        return sendDate;
    }

    public Message sendDate(LocalDate sendDate) {
        this.sendDate = sendDate;
        return this;
    }

    public void setSendDate(LocalDate sendDate) {
        this.sendDate = sendDate;
    }

    public UserSocial getSender() {
        return sender;
    }

    public Message sender(UserSocial userSocial) {
        this.sender = userSocial;
        return this;
    }

    public void setSender(UserSocial userSocial) {
        this.sender = userSocial;
    }

    public UserSocial getRecipient() {
        return recipient;
    }

    public Message recipient(UserSocial userSocial) {
        this.recipient = userSocial;
        return this;
    }

    public void setRecipient(UserSocial userSocial) {
        this.recipient = userSocial;
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
        Message message = (Message) o;
        if (message.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), message.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Message{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", sendDate='" + getSendDate() + "'" +
            "}";
    }
}
