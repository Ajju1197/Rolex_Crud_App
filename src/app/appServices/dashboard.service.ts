import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from '../Pages/dashboard/models/dashboard-employee';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public apiUrl = "https://reqres.in/api/users";
  private employeeUrlEndpoint = "https://localhost:7080/api";

  constructor(private _http: HttpClient) {
  }

  getEmployees(): Observable<Employee[]>{
    return this._http.get<Employee[]>(this.employeeUrlEndpoint + "/EmployeeCrudApi");
  }

  getEmployee(employeeId): Observable<Employee>{
    return this._http.get<Employee>(this.employeeUrlEndpoint + "/EmployeeCrudApi/" + employeeId);
  }


  addEmployee(employee: Employee): Observable<Employee>{
    return this._http.post<Employee>(this.employeeUrlEndpoint + "/EmployeeCrudApi", employee);
  }

  updateEmployee(employeeId:any, employee:Employee): Observable<any>{
    return this._http.put<any>(this.employeeUrlEndpoint + "/EmployeeCrudApi/" + employeeId, employee);
  }

  deleteEmployee(employeeId: any): Observable<any>{
    return this._http.delete<any>(this.employeeUrlEndpoint + "/EmployeeCrudApi/" + employeeId);
  }

}
