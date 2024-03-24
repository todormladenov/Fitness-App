import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AuthenticateComponent,
    GlobalLoaderComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AuthenticateComponent,
    GlobalLoaderComponent
  ]
})
export class CoreModule { }
