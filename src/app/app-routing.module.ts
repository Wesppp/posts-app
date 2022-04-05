import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostsComponent} from "./pages/posts/posts.component";
import {PostInfoComponent} from "./pages/post-info/post-info.component";
import {ErrorPageComponent} from "./pages/error-page/error-page.component";
import {AppLayoutComponent} from "./shared/layouts/app-layout/app-layout.component";
import {UsersComponent} from "./pages/users/users.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent, children: [
      {path: '', redirectTo: '/posts', pathMatch: 'full'},
      {path: 'posts', component: PostsComponent},
      {path: 'posts/:id', component: PostInfoComponent},
      {path: 'users', component: UsersComponent},
      {path: 'user-profile/:id', component: UserProfileComponent},
      {path: 'error-page', component: ErrorPageComponent},
      {path: '**', redirectTo: '/error-page', pathMatch: 'full'}
    ]
  }]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
