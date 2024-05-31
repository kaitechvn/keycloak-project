import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  template: `
    <div>
      <h3>Access Denied</h3>
      <p>You don't have permission to access this resource.</p>
    </div>
  `,
  styles: []
})
export class AccessDeniedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
