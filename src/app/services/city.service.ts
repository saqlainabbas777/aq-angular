import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HelperService} from "./helper.service";
import {ConstantService} from "./constant.service";

@Injectable({
  providedIn: 'root'
})
export class CityService {
  constructor(private helpers: HelperService,
              private constants: ConstantService
  ) {}

  getCitiesByCountry(countryCode: string): Observable<any> {
    return this.helpers.requestCall(this.constants.apiMethod.get, `${this.constants.apiRoutes.getCitiesByCountry}${countryCode}&order_by=city`);
  }
}
