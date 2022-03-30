import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PostsComponent} from "./pages/posts/posts.component";
import {PostInfoComponent} from "./pages/post-info/post-info.component";

const routes: Routes = [
      {path: '', redirectTo: '/posts', pathMatch: 'full'},
      {path: 'posts', component: PostsComponent},
      {path: 'post-info', component: PostInfoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
