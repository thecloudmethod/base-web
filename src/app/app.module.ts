import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { DefaultComponent } from './views/default/default.component';
import { HomeComponent } from './views/home/home.component';
import { SharedModule } from './modules/shared/shared.module';
import { WindowService } from './services/window/window.service';

// Modules
import { AngularMaterialModule } from './modules/angular-material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// For AoT compilation:
export function getWindow() {
  return window;
}

@NgModule({
  declarations: [DefaultComponent, HomeComponent],
  imports: [
    AngularMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Add .withServerTransition() to support Universal rendering.
    // The application ID can be any identifier which is unique on
    // the page.
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    TransferHttpCacheModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'speakers',
        loadChildren: () =>
          import('./modules/speakers/speakers.module').then(
            m => m.SpeakersModule,
          ),
      },
    ]),
    SharedModule,
    
  ],
  providers: [
    {
      provide: WindowService,
      useFactory: getWindow,
    },
  ],
  bootstrap: [DefaultComponent],
})
export class AppModule {}
