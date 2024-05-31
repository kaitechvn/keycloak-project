package com.example.doan2.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

  private String id;
  private String firstname;
  private String lastname;
  @Email
  @NotEmpty
  private String email;
  @NotEmpty
  private String username;
  @NotEmpty
  private String password;

}
