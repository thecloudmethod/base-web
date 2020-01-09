import {NgModule} from '@angular/core';
import {ServerModule, ServerTransferStateModule} from '@angular/platform-server';
import {ModuleMapLoaderModule} from '@nguniversal/module-map-ngfactory-loader';

import {AppModule} from './app.module';
import { DefaultComponent } from './views/default/default.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UniversalInterceptorService } from './modules/shared/interceptors/universal-interceptor.service';
import { WindowService } from './services/window/window.service';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    NoopAnimationsModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule // <-- *Important* to have lazy-loaded routes work
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [DefaultComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptorService,
      multi: true // <-- important (you can have many interceptors)
    },
    {
      provide: 'serverUrl',
      useValue: 'http://localhost:4001/'
    },
    {
      provide: WindowService,
      useClass: WindowService
    }
  ]
})
export class AppServerModule {}
