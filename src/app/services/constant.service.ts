import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  constructor() {}
  apiRoutes = {
    getAllCountries: `${environment.BASE_URL}countries?limit=200&page=1&offset=0&sort=asc&order_by=country`,
    getCitiesByCountry: `${environment.BASE_URL}cities?limit=100&page=1&offset=0&sort=asc&country=`,
    getMeasurement: `${environment.BASE_URL}latest?limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=`,
  };

  apiMethod = {
    get: 'get',
    post: 'post',
    put: 'put',
    delete: 'delete'
  };
}
