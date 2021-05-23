import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FlightInfo } from '../models/flight-info';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlightInfoComponent implements OnInit {
  flightInfo$: Observable<FlightInfo | null> = of();
  constructor(
    private _workersService: WorkersService) {}

    ngOnInit(): void {
      this.flightInfo$ = this._workersService.selectedFlightInfo$;
    }
}
