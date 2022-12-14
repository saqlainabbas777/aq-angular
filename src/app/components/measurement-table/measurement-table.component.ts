import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from "@angular/core";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {AirQualityService} from "../../services/airQuality.service";
import {HelperService} from "../../services/helper.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-measurement-table',
  templateUrl: './measurement-table.component.html',
  styleUrls: ['./measurement-table.component.css']
})
export class MeasurementTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() countryCode: string = '';
  @Input() cityName: string = '';

  displayedColumns: string[] = ['co-ordinates', 'parameters', 'unit', 'value', 'last-updated'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private airQuality: AirQualityService,
              private helpers: HelperService,
              private toastrService: ToastrService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  ngOnChanges() {
    console.log('city', this.cityName);
    if (typeof this.countryCode === 'string' && typeof this.cityName === 'string') {
      this.getMeasurements(this.countryCode, this.cityName);
    }
  }

  getMeasurements(countryCode: string, cityName: string) {
    if (countryCode !== null && countryCode !== '' && cityName !== null && cityName !== '') {
      this.airQuality.getMeasurements(countryCode, cityName).subscribe(res => {
        if (res.results.length) {
          this.dataSource = new MatTableDataSource<any>(this.helpers.calculateMeasurementData(res.results));
          this.dataSource.paginator = this.paginator!;
        } else {
          this.toastrService.error(`${cityName} has no air quality measurements`)
        }
      }, error => {
        this.toastrService.error(`unable to fetch measurement of ${cityName}`)
      })
    } else {
      this.dataSource = new MatTableDataSource<any>([]);
    }
  }
}
