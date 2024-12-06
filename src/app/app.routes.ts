import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { DetailsComponent } from './features/details/details.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'details/:name', component: DetailsComponent }
]