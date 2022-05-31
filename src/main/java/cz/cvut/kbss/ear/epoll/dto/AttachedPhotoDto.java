package cz.cvut.kbss.ear.epoll.dto;

import javax.validation.constraints.Pattern;

public class AttachedPhotoDto {
    private String url;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
