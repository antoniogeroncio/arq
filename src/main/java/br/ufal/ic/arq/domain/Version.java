package br.ufal.ic.arq.domain;



import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Version.
 */
@Entity
@Table(name = "version")
public class Version implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "version", nullable = false)
    private String version;

    
    @Lob
    @Column(name = "code", nullable = false)
    private byte[] code;

    @Column(name = "code_content_type", nullable = false)
    private String codeContentType;

    @NotNull
    @Column(name = "jhi_date", nullable = false)
    private String date;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVersion() {
        return version;
    }

    public Version version(String version) {
        this.version = version;
        return this;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public byte[] getCode() {
        return code;
    }

    public Version code(byte[] code) {
        this.code = code;
        return this;
    }

    public void setCode(byte[] code) {
        this.code = code;
    }

    public String getCodeContentType() {
        return codeContentType;
    }

    public Version codeContentType(String codeContentType) {
        this.codeContentType = codeContentType;
        return this;
    }

    public void setCodeContentType(String codeContentType) {
        this.codeContentType = codeContentType;
    }

    public String getDate() {
        return date;
    }

    public Version date(String date) {
        this.date = date;
        return this;
    }

    public void setDate(String date) {
        this.date = date;
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
        Version version = (Version) o;
        if (version.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), version.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Version{" +
            "id=" + getId() +
            ", version='" + getVersion() + "'" +
            ", code='" + getCode() + "'" +
            ", codeContentType='" + getCodeContentType() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
