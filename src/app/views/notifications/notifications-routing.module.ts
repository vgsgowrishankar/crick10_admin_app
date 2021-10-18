import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertsComponent } from './alerts.component';
import { BadgesComponent } from './badges.component';
import { ModalsComponent } from './modals.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notifications'
    },
    children: [
      {
        path: '',
        redirectTo: 'details'
      },
      {
        path: 'details',
        component: AlertsComponent,
        data: {
          title: 'Details'
        }
      },
      {
        path: 'allPlayers/:id',
        component: BadgesComponent,
        data: {
          title: 'Badges'
        }
      },
      {
        path: 'Createplayers/:id/:name',
        component: ModalsComponent,
        data: {
          title: 'Modals',
          data:'create'
        }
      },
      {
        path: 'Updateplayers/:Updateid',
        component: ModalsComponent,
        data: {
          title: 'Modals',
          data:'edit'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}
