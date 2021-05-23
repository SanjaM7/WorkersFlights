import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightInfoComponent } from './flight-info/flight-info.component';
import { WorkerFlightListComponent } from './worker-flight-list/worker-flight-list.component';
import { WorkerListComponent } from './worker-list/worker-list.component';

const routes: Routes = [
  {
    path: '',
    component: WorkerListComponent,
    children: [
      {
        path: ':workerId',
        component: WorkerFlightListComponent,
        children: [
          {
            path: ':flightNumber',
            component: FlightInfoComponent,
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkersRoutingModule { }
