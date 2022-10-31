import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { FavoriesComponent } from './favories/favories.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PostCorrectorComponent } from './post-corrector/post-corrector.component';
import { PostComponent } from './post/post.component';
import { SigninComponent } from './signin/signin.component';
import { WrongWayComponent } from './wrong-way/wrong-way.component';

const routes: Routes = [
{path:'', component: AllPostsComponent},
{path:'signin', component: SigninComponent},
{path:'newpost', component: EditPostComponent},
{path:'login', component: LoginComponent},
{path:'myprofile', component: MyProfileComponent},
{path:'favories', component: FavoriesComponent},
{path:'contacts', component: ContactsComponent},
{path:'corrector/:id', component: PostCorrectorComponent},
{path:'post/:id', component: PostComponent},
{path:'**', component: WrongWayComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
