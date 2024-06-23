import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class YoutubeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public gridApi: GridApi;
  public filterData: any = [];
  public youtubeModel: any;

  ngOnInit(): void {
    this.youtubeModel = 'All';
  }


  public youtubeData = [
    {
      id: 1,
      youtubeUniqId: 1,
      youtubeChannel: 'Yahoo baba',
      youtubeLink: 'https://www.youtube.com/embed/GpcMasRWUhI',
      youtubeCourseName: 'Html Course',
    },
    {
      id: 2,
      youtubeUniqId: 1,
      youtubeChannel: 'Yahoo baba',
      youtubeLink: 'https://www.youtube.com/embed/GpcMasRWUhI',
      youtubeCourseName: 'Css Course',
    },
    {
      id: 3,
      youtubeUniqId: 1,
      youtubeChannel: 'Yahoo baba',
      youtubeLink: 'https://www.youtube.com/embed/Lgxgm-T9cgA',
      youtubeCourseName: 'Javascript Course',
    },
    {
      id: 4,
      youtubeUniqId: 1,
      youtubeChannel: 'Yahoo baba',
      youtubeLink: 'https://www.youtube.com/embed/wkSA9bfCmKU',
      youtubeCourseName: 'Bootstrap Course',
    },
    {
      id: 5,
      youtubeUniqId: 2,
      youtubeChannel: 'Kudvenkat',
      youtubeLink: 'https://www.youtube.com/embed/JYPyy-hvjYc',
      youtubeCourseName: 'Angular Course',
    },
    {
      id: 6,
      youtubeUniqId: 3,
      youtubeChannel: 'Ux Trendz',
      youtubeLink: 'https://www.youtube.com/embed/dPqsP84GOwE',
      youtubeCourseName: 'Rxjs Course',
    },
  ]

  public dropdownOptions = [
    { value: "All", },
    { value: 'Yahoo baba', },
    { value: 'Kudvenkat', },
    { value: 'Ux Trendz', }
  ];

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'id' },
    { field: 'youtubeChannel' },
    { field: 'youtubeCourseName' },
    {
      field: 'youtubeLink',
    }

  ];

  onCellClicked(event:any){
    const columnField = event.column.getColDef().field;
    if(event.data.youtubeLink) window.open(event.data.youtubeLink, '_blank');
  }

  onSelectionChanged(event) {
    // const selectedRow = this.gridApi.getSelectedRows()[0];
    // if(!selectedRow) return false;

    // if(selectedRow.youtubeLink)
    //     var youtube = window.open(selectedRow.youtubeLink, '_blank');
    //     return youtube;
  }


  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 300,
  };


  // Example load data from sever
  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api
    if (this.youtubeModel == 'All') {
      this.gridApi.setRowData(this.youtubeData)
    }
  }

  courseNameChange() {
    this.filterData = this.youtubeData;
    if (this.youtubeModel != 'All') {
      this.filterData = this.youtubeData.filter((course) => {
        return course.youtubeChannel == this.youtubeModel;
      })
    }

    this.gridApi.setRowData(this.filterData)
  }
}
