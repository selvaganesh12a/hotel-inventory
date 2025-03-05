import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent,{
  providers: [provideHttpClient(),FormsModule],
}).catch((err) => console.error(err));
