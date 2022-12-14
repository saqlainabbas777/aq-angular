import {Injectable} from '@angular/core';
import {from, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {ConstantService} from "./constant.service";

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor(private http: HttpClient,
              private constants: ConstantService
  ) {
  }

  requestCall(method: string, api: string, data?: any, httpOptions?: any): Observable<any> {
    switch (method) {
      case this.constants.apiMethod.post:
        return this.http.post(api, data, httpOptions);
      case this.constants.apiMethod.get:
        return this.http.get(api);
      case this.constants.apiMethod.put:
        return this.http.put(api, data);
      case this.constants.apiMethod.delete:
        return this.http.delete(api);
      default:
        return from([1]);
    }
  }

  calculateMeasurementData(data: any) {
    let calculatedData: any[] = [];
    data.forEach((res: any) => {
      let row: any = {};
      row.coordinates = res.coordinates;
      res.measurements.forEach((measurement: any) => {
        calculatedData.push({
          ...measurement,
          coordinates: row.coordinates
        })
      });
    })
    return calculatedData;
  }
}
