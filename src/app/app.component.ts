import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {CountryService} from "./services/country.service";
import {CityService} from "./services/city.service";
import {ToastrService} from "ngx-toastr";
import {AirQualityService} from "./services/airQuality.service";
import {HelperService} from "./services/helper.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  countries = [];
  cities = [];
  country = new FormControl();
  firstCity = new FormControl('', Validators.required);
  secondCity = new FormControl('', Validators.required);

  constructor(private countryService: CountryService,
              private cityService: CityService,
              private toastrService: ToastrService,
  ) {}

  ngOnInit() {
    this.getAllCountries();
  }

  onSubmit() {
  }

  getAllCountries(): any {
    this.countryService.getAllCountries().subscribe(res => {
      // get countries
      if (res.results) {
        this.countries = res.results;
      } else {
        this.toastrService.error('unable to get countries');
      }
    }, error => {
      this.toastrService.error('unable to get countries');
    })
  }

  onCountryChange(_event: any) {
    if (typeof _event === 'string') {
      this.firstCity.patchValue('');
      this.secondCity.patchValue('');
      this.cityService.getCitiesByCountry(_event).subscribe(res => {
        // get cities
        if (res.results.length) {
          this.cities = res.results;
        } else {
          this.toastrService.error(`${this.country.value} has no city, please select other`);
        }
      }, error => {
        this.toastrService.error(`${this.country.value} has no city, please select other`);
      })
    }
  }
}


