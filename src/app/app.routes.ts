import { LoginComponent } from './components/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PublicadoresComponent } from './components/publicadores.component';

const routes: Routes = [
    { path: 'hermanos', component: PublicadoresComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', pathMatch:'full',  redirectTo:'/hermanos' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ROUTES {}
