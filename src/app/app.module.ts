import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './shared/services/auth/auth.gaurd';
import { AuthInterceptor } from './shared/services/auth/auth.interceptor';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent, AddGameDialog } from './home/home.component';
import { TokenHelper } from './helpers/TokenHelper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HomeComponent,
    AddGameDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule
  ],
  providers: [
    AuthGuard,
    TokenHelper,
    {
      provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
