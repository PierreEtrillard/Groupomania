import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SigninComponent } from './signin/signin.component';
import { WrongWayComponent } from './wrong-way/wrong-way.component';

const routes: Routes = [
{path:'', component: AllPostsComponent},
{path:'signin', component: SigninComponent},
{path:'dashboard', component: DashboardComponent},
{path:'newpost', component: EditPostComponent},
{path:'login', component: LoginComponent},
{path:'myprofile', component: MyProfileComponent},
{path:'**', component: WrongWayComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
