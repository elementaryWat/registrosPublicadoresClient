import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PublicadoresComponent } from './components/publicadores.component';

const routes: Routes = [
    { path: 'hermanos', component: PublicadoresComponent },
    { path: '**', pathMatch:'full',  redirectTo:'/hermanos' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ROUTES {}
