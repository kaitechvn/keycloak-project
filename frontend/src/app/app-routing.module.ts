import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './ui/product/product.component';
import { AuthGuard } from './guard/auth.guard';
import { UserComponent } from './ui/user/user.component';
import { HomeComponent } from './ui/home/home.component';
import { ProfileComponent } from './ui/profile/profile.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';

const routes: Routes = [
  {path: "product", component : ProductComponent, canActivate : [AuthGuard], data : {roles : ['USER','ADMIN']}},
  {path: "user" , component: UserComponent, canActivate : [AuthGuard], data : {roles : ['ADMIN']}},
  {path: '', component: HomeComponent },
  { path: "profile", component: ProfileComponent },
  { path: "access-denied", component: AccessDeniedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
