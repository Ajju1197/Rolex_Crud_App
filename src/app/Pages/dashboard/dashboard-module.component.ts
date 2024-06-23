import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from 'src/app/appServices/dashboard.service';
import { Employee } from './models/dashboard-employee';
import { Router } from '@angular/router';
import { DashBoardDetailsInfoComponent } from './dash-board-details-info/dash-board-details-info.component';

@Component({
  selector: 'app-dashboard-module',
  templateUrl: './dashboard-module.component.html',
  styleUrls: ['./dashboard-module.component.css']
})
export class DashboardModuleComponent implements OnInit {

  public dashboardUsers:any[] = [];
  public buttonTitle = "Add";
  public dataFromChildWindow;

  public employeeData: Employee = {
    employeeName: "",
    employeeAddress: "",
    employeeDOB: "",
    employeeProfile: "",
  }

  public previewUrl:string;

  @ViewChild(DashBoardDetailsInfoComponent) childCardRef:DashBoardDetailsInfoComponent;
  constructor(private toastr: ToastrService, private dashboardService: DashboardService, private router: Router) { }

  ngOnInit(): void {
    this.getAllDashboardUsers();
  }

  // Getting all Employees
  getAllDashboardUsers(){
    this.dashboardService.getEmployees().subscribe((serviceResponse:Employee[]) => {
      if(!serviceResponse) return;

      if(serviceResponse && serviceResponse.length > 0){
        this.dashboardUsers = serviceResponse;
      }
    })
  }

  // Edit the Employee and getting the data from child window with @output properties.
  editEmployee(childWindowData){
    this.dataFromChildWindow = childWindowData;
    this.employeeData = this.dataFromChildWindow.employeeData;
    if(this.dataFromChildWindow.isFromChildWindow){
      this.buttonTitle = "Update";
    }
  }

  onlyNumbersAllowed(e) {
    var keyCode = e.keyCode;
    if (keyCode >= 48 && keyCode <= 57) {
      return
    }
    else {
      // Prevent any other characters from being entered
      e.preventDefault();
    }
  }

  // Image Uploading with File reader
  uploadFile(e){
    const file: File = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.employeeData.employeeProfile = reader.result as string;
      };
    }
  }


  onSubmit(){
    // Validation Block
    if (!this.employeeData.employeeName) {
      this.toastr.error("Please Enter a Valid Name.")
      return;
    }
    if (!this.employeeData.employeeAddress) {
      this.toastr.error("Please Enter a Valid Address.")
      return;
    }
    if (!this.employeeData.employeeDOB) {
      this.toastr.error("Please Upload a Valid File.")
      return;
    }
    if (!this.employeeData.employeeProfile) {
      this.toastr.error("Please Enter a Valid DOB.")
      return;
    }

    // Add Employee
    this.dashboardService.addEmployee(this.employeeData).subscribe((data) => {
      if(!data){
        this.toastr.error("Employee Already Exists.");
        return;
      }
      this.toastr.success("Employee Added Successfully.");
      this.getAllDashboardUsers();
      // Clearing the data after submit form.
      this.employeeData = {
        employeeName: "",
        employeeAddress: "",
        employeeDOB: "",
        employeeProfile: "",
      }
    });

    // Edit Employee
    if(this.dataFromChildWindow.isFromChildWindow){
      this.dashboardService.updateEmployee(this.dataFromChildWindow.employeeData.employeeId, this.dataFromChildWindow.employeeData).subscribe(data =>{

        this.toastr.success("Employee Updated Successfully.");
        this.getAllDashboardUsers();
        this.buttonTitle = "Add";
        this.employeeData = {
          employeeName: "",
          employeeAddress: "",
          employeeDOB: "",
          employeeProfile: "",
        }
      })
    }
  }

  // Delete the Employee data.
  deleteEmployee(employeeId){
    this.dashboardService.deleteEmployee(employeeId).subscribe(data => {
      this.toastr.success('Employee Deleted Successfully.');
      this.getAllDashboardUsers();
    });
  }

  // View Employee Details With Id
  viewEmployee(employeeId){
    this.router.navigate(['dashboard/dashboardUser/'+ employeeId])
  }

}
