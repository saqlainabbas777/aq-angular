import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HelperService} from "./helper.service";
import {ConstantService} from "./constant.service";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(private helpers: HelperService,
              private constants: ConstantService
              ) {}

  getAllCountries(): Observable<any> {
    return this.helpers.requestCall(this.constants.apiMethod.get, this.constants.apiRoutes.getAllCountries);
  }
}
