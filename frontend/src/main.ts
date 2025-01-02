import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';  // For Router
import { routes} from './app/app.routes'; 


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),  // Provides HTTP services
    provideRouter(routes),  // Provides router configuration
  ]
})
  .catch((err) => console.error(err));
