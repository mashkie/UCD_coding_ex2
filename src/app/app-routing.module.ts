import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { DashboardComponent } from './dashboard/container/dashboard.component';
import { KindergardenPageComponent } from './kindergarden-page/container/kindergarden-page.component';
import { KindergardenDetailPageComponent } from './kindergarden-detail-page/container/kindergarden-detail-page.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'about', component: AboutPageComponent },
  {
    path: 'kindergardens',
    component: KindergardenPageComponent,
  },
  {
    path: 'kindergardens/:id',
    component: KindergardenDetailPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
