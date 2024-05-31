package com.example.doan2.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
@ConfigurationProperties("keycloak")
public class KeycloakSecurityUtil {

  Keycloak keycloak;

  private String realm;

  private String serverUrl;

  private String clientId;

  private String grantType;

  private String username;

  private String password;

  public Keycloak getKeycloakInstance() {
    if (keycloak == null) {
      keycloak = KeycloakBuilder.builder()
        .serverUrl(serverUrl)
        .realm(realm)
        .grantType(grantType)
        .clientId(clientId)
        .username(username)
        .password(password)
        .build();
    }
    return keycloak;
  }


}
