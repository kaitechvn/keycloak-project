import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare const bootstrap: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  public user: any;
  public showForm = false;
  public newUser = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  };

  public selectedUser: any = {};

  showConfirmDeleteModal: boolean = false;
  public userToDelete: any = {}; 
  deleteConfirmation: boolean = false;
  

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }


  loadUsers() {
    this.http.get("http://localhost:8082/api/user")
      .subscribe({
        next: data => {
          this.user = data;
        },
        error: err => {
          console.log(err);
        }
      });
  }



  createUser() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('username', this.newUser.username);
    body.set('firstname', this.newUser.firstname);
    body.set('lastname', this.newUser.lastname);
    body.set('email', this.newUser.email);
    body.set('password', this.newUser.password);

    this.http.post("http://localhost:8082/api/user", body.toString(), { headers })
      .subscribe({
        next: data => {
          this.loadUsers(); // Reload users after successful creation
          this.showForm = false; // Hide the form
          this.resetForm();
        },
        error: err => {
          console.log(err);
        }
      });
  }

  updateUser() {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new URLSearchParams();
    body.set('username', this.selectedUser.username);
    body.set('firstname', this.selectedUser.firstname);
    body.set('lastname', this.selectedUser.lastname);
    body.set('email', this.selectedUser.email);

    this.http.put("http://localhost:8082/api/user", body.toString(), { headers })
      .subscribe({
        next: data => {
          this.loadUsers();
          this.showForm = false;
          this.resetForm();
        },
        error: err => {
          console.log(err);
        }
      });
  }

  deleteUser() {
    const headers = new HttpHeaders();
    const username = this.userToDelete.username;

    this.http.delete(`http://localhost:8082/api/user?username=${username}`, { headers })
      .subscribe({
        next: data => {
          this.loadUsers();
          this.showForm = false;
        },
        error: err => {
          console.log(err);
          
        }
      });
  }


  cancel() {
    this.showForm = false;
    this.newUser = { username: '', firstname: '', lastname: '', email: '', password: '' };
  }

  resetForm() {
    this.newUser = { username: '', firstname: '', lastname: '', email: '', password: '' };
  }

  openUpdateModal(user: any) {
    this.selectedUser = { ...user }; 
    // Open the modal
    const modal = new bootstrap.Modal(document.getElementById('updateUserModal'));
    modal.show();
  }

  confirmDelete(user: any): void {
    this.userToDelete = { ... user };
    this.deleteConfirmation = false; 
    const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
    modal.show();
  }

 
}
