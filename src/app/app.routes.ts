import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { CardDetailComponent } from './modules/cards/detail/card-detail/card-detail.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'detail/:id',
        component: CardDetailComponent
    },
    {
        path: '**',
        redirectTo: '/'
    }
];
