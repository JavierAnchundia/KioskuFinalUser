import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

<<<<<<< HEAD
  const bootstrap = () => {
    platformBrowserDynamic().bootstrapModule(AppModule);
  };if (typeof window['cordova'] !== 'undefined') {
    document.addEventListener('deviceready', () => {
      bootstrap();
    }, false);
  } else {
    bootstrap();
  }
  
=======
const bootstrap = () => {
  platformBrowserDynamic().bootstrapModule(AppModule);
};
if (typeof window['cordova'] !== 'undefined') {
  document.addEventListener('deviceready', () => {
    bootstrap();
  }, false);
} else {
  bootstrap();
}
>>>>>>> e3eef4a9763716159046bde603245d7b6af1261c
