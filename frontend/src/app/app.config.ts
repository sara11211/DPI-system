// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { administratifRoutes, medecinRoutes } from './app.routes'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(medecinRoutes), 
  ]
};