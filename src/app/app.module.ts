import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import { AppComponent } from './app.component';
import { PostsComponent } from './pages/posts/posts.component';
import { PostComponent } from './pages/posts/post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { PostInfoComponent } from './pages/post-info/post-info.component';
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommentComponent } from "./pages/post-info/comment/comment.component";
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AppLayoutComponent } from './shared/layouts/app-layout/app-layout.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from "@angular/material/menu";
import { UsersComponent } from './pages/users/users.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ProgressSpinnerComponent } from "./components/progress-spinner/progress-spinner.component";
import { PostCrudDialogComponent } from './components/modal-dialogs/post-crud-dialog/post-crud-dialog.component';
import { AddUserDialogComponent } from './components/modal-dialogs/add-user-dialog/add-user-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        PostsComponent,
        PostComponent,
        PostInfoComponent,
        CommentComponent,
        FilterPipe,
        ErrorPageComponent,
        AppLayoutComponent,
        UsersComponent,
        UserProfileComponent,
        ProgressSpinnerComponent,
        PostCrudDialogComponent,
        AddUserDialogComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatMenuModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
