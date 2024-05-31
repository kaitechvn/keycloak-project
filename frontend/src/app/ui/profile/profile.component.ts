import { KeycloakService } from 'keycloak-angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {

  accessToken!: string;
  expiresIn!: number;
  refreshToken!: string;
  refreshTokenExpiresIn!: number;
  tokenType!: string;
  idToken!: string;
  authorizationCode: string | null = null;

  constructor(
    private keycloakService: KeycloakService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.handleProfile();
    
    // Retrieve authorization code from URL if available
    this.route.queryParams.subscribe(params => {
      this.authorizationCode = params['code'] || null;
    });
  }

  handleProfile() {
    const keycloakInstance = this.keycloakService.getKeycloakInstance();
    // Fetch tokens and other properties from Keycloak service
    this.accessToken = keycloakInstance.token || '';
    this.expiresIn = this.getExpiresIn();
    this.refreshToken = keycloakInstance.refreshToken || '';
    this.refreshTokenExpiresIn = this.getRefreshTokenExpiresIn();
    this.tokenType = 'Bearer'; // Keycloak token type is always "Bearer"
    this.idToken = keycloakInstance.idToken || '';

  }

  private getExpiresIn(): number {
    const token = this.keycloakService.getKeycloakInstance().token;
    if (!token) {
      return 0;
    }
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return 0;
    }
    const now = Date.now() / 1000;
    return decodedToken.exp - now;
  }

  private getRefreshTokenExpiresIn(): number {
    const token = this.keycloakService.getKeycloakInstance().refreshToken;
    if (!token) {
      return 0;
    }
    const decodedToken = this.decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
      return 0;
    }
    const now = Date.now() / 1000;
    return decodedToken.exp - now;
  }

  private decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
  
  getAuthorizationCode() {
    const keycloakInstance = this.keycloakService.getKeycloakInstance();
    const authServerUrl = keycloakInstance.authServerUrl;
    const realm = keycloakInstance.realm;
    const clientId = keycloakInstance.clientId;
    const redirectUri = window.location.origin + '/profile'; // Replace with your redirect URI
    const responseType = 'code';
    const scope = 'openid'; // Adjust scopes as needed

    const authUrl = `${authServerUrl}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    // Redirect the user to Keycloak for authentication
    window.location.href = authUrl;
  }

}

