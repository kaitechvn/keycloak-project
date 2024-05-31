package com.example.doan2.controller;

import com.example.doan2.entity.User;
import com.example.doan2.security.KeycloakSecurityUtil;
import jakarta.validation.Valid;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.common.util.CollectionUtil;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@PreAuthorize("hasAuthority('ADMIN')")
@RequestMapping("/api")
public class UserController {

  @Autowired
  KeycloakSecurityUtil keycloakUtil;

  @Value("${keycloak.realm}")
  private String realm ;

  @GetMapping("/user")
  public List<User> getUser() {
    Keycloak keycloak = keycloakUtil.getKeycloakInstance();
    List<UserRepresentation> userRepresentations =
      keycloak.realm(realm).users().list();
    return MapUsers(userRepresentations);
  }

  @PreAuthorize("hasAuthority('ADMIN')")
  @PostMapping( value = "/user", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
  public Response createUser(@Valid User user) {
    UserRepresentation userRep = mapUserRep(user);
    Keycloak keycloak = keycloakUtil.getKeycloakInstance();
    keycloak.realm(realm).users().create(userRep);

    return Response.ok(user).build();
  }

  @PreAuthorize("hasAuthority('ADMIN')")
  @PutMapping(value = "/user" , consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
  public Response updateUser(User user) {
    Keycloak keycloak = keycloakUtil.getKeycloakInstance();
    List<UserRepresentation> users = keycloak.realm(realm).users().search(user.getUsername(), true);
    UserRepresentation userRep;
    userRep = users.getFirst();

    userRep.setFirstName(user.getFirstname());
    userRep.setLastName(user.getLastname());
    userRep.setEmail(user.getEmail());
    keycloak.realm(realm).users().get(userRep.getId()).update(userRep);

    return Response.ok(user).build();
  }

  @PreAuthorize("hasAuthority('ADMIN')")
  @DeleteMapping(value = "/user")
  public Response deleteUser(@RequestParam("username") String username) {
    Keycloak keycloak = keycloakUtil.getKeycloakInstance();
    List<UserRepresentation> users = keycloak.realm(realm).users().search(username, true);
    UserRepresentation userRep;
    userRep = users.getFirst();

    keycloak.realm(realm).users().delete(userRep.getId());
    return Response.ok().build();
  }

  private List<User> MapUsers(List<UserRepresentation> userRepresentations) {
    List<User> user = new ArrayList<>();
    if (CollectionUtil.isNotEmpty(userRepresentations)) {
      userRepresentations.forEach(userRep -> user.add(mapUser(userRep)));
    }
    return user;
  }

  private User mapUser(UserRepresentation userRepresentation) {
    User user = new User();
    user.setFirstname(userRepresentation.getFirstName());
    user.setLastname(userRepresentation.getLastName());
    user.setEmail(userRepresentation.getEmail());
    user.setUsername(userRepresentation.getUsername());

    return user;
  }

  private UserRepresentation mapUserRep(User user) {
    UserRepresentation userRep = new UserRepresentation();
    userRep.setUsername(user.getUsername());
    userRep.setFirstName(user.getFirstname());
    userRep.setLastName(user.getLastname());
    userRep.setEmail(user.getEmail());
    userRep.setEnabled(true);
    userRep.setEmailVerified(false);
    List<CredentialRepresentation> creds = new ArrayList<>();
    CredentialRepresentation cred = new CredentialRepresentation();
    cred.setTemporary(false);
    cred.setValue(user.getPassword());
    creds.add(cred);
    userRep.setCredentials(creds);

    return userRep;
  }



}
