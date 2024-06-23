import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/dashboard-employee';
import { DashboardService } from 'src/app/appServices/dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dash-board-details-info',
  templateUrl: './dash-board-details-info.component.html',
  styleUrls: ['./dash-board-details-info.component.css']
})
export class DashBoardDetailsInfoComponent implements OnInit {

  Inspections = [];
  @Input() dashboardUserData;
  @Output() deleteEmployeeWithId: EventEmitter<any> = new EventEmitter<any>();
  @Output() editEmployeeWithId: EventEmitter<any> = new EventEmitter<any>()
  @Output() viewEmployeeWithId: EventEmitter<any> = new EventEmitter<any>()
  filteredUser: any;

  constructor(private router: Router, private dashboardService: DashboardService, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  viewEditDeleteEmployee(employee, buttonType) {
    if (buttonType == 1) {
      this.editEmployeeWithId.emit({
        employeeData: employee,
        isFromChildWindow: true,
      })
    }
    if (buttonType == 2) {
      this.deleteEmployeeWithId.emit(employee.employeeId);
    }
    if (buttonType == 3) {
      this.viewEmployeeWithId.emit(employee.employeeId);
    }
  }



  filterEmployees(text:string){
    if(!text) {
      this.toastr.error('Please Enter Employee Name.');
      return;
    }
    this.dashboardUserData.filter(filterEmployee => filterEmployee.employeeName.toLowerCase().includes(text.toLowerCase()))
  }
}
