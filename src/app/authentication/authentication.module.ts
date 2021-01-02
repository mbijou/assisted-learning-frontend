import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddHeaderInterceptorComponent } from './add-header-interceptor/add-header-interceptor.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AddHeaderInterceptorComponent],
  imports: [
      CommonModule,
      HttpClientModule,
  ]
})
export class AuthenticationModule { }



