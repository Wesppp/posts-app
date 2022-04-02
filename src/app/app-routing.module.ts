import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostsComponent} from "./pages/posts/posts.component";
import {PostInfoComponent} from "./pages/post-info/post-info.component";
import {ErrorPageComponent} from "./pages/error-page/error-page.component";
import {AppLayoutComponent} from "./layouts/app-layout/app-layout.component";

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent, children: [
      {path: '', redirectTo: '/posts', pathMatch: 'full'},
      {path: 'posts', component: PostsComponent},
      {path: 'posts/:id', component: PostInfoComponent},
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
