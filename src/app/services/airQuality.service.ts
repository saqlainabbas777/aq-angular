import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HelperService} from "./helper.service";
import {ConstantService} from "./constant.service";

@Injectable({
  providedIn: 'root'
})
export class AirQualityService {
  constructor(private helpers: HelperService,
              private constants: ConstantService
  ) {}

  getMeasurements(countryCode: string, cityName: string): Observable<any> {
    return this.helpers.requestCall(this.constants.apiMethod.get, `${this.constants.apiRoutes.getMeasurement}${countryCode}&city=${cityName}&order_by=lastUpdated&dumpRaw=false`);
  }
}
