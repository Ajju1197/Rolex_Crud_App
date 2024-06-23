import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from 'src/app/appServices/dashboard.service';

@Component({
  selector: 'app-dashboard-user-details',
  templateUrl: './dashboard-user-details.component.html',
  styleUrls: ['./dashboard-user-details.component.css']
})
export class DashboardUserDetailsComponent implements OnInit {

  user: any;
  id: number;
  constructor(private _route: ActivatedRoute, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.params['id'];
    this.dashboardService.getEmployee(this.id).subscribe((serviceResponse) => {
      if (serviceResponse) {
        this.user = serviceResponse;
      }
    })
  }

  goBackHistory() {
    history.go(-1);
  }
}
