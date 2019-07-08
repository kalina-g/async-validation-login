import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { AppErrorInterceptor } from './interceptors/app-error.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, NavigationComponent, HomeComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot() 
  ],
  exports: [ RegisterComponent, NavigationComponent, HomeComponent],

   
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppErrorInterceptor,
      multi:true
    }
  ]
})
export class CoreModule { }
