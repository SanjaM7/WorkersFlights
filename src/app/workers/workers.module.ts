import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTableModule } from '@angular/material/table';
import { WorkerFlightListComponent } from './worker-flight-list/worker-flight-list.component';
import { WorkerListComponent } from './worker-list/worker-list.component';
import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersService } from './workers.service';
import { SharedModule } from '../shared/shared.module';
import { FlightInfoComponent } from './flight-info/flight-info.component';

@NgModule({
  declarations: [
    WorkerListComponent,
    WorkerFlightListComponent,
    FlightInfoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    WorkersRoutingModule,
    FlexLayoutModule,
    MatTableModule,
    SharedModule
  ],
  providers: [
    WorkersService
  ]
})
export class WorkersModule { }
