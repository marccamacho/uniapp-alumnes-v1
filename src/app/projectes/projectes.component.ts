import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';
import { StorageService }    from '../services/storage.service';

@Component({
  selector: 'app-projectes',
  templateUrl: './projectes.component.html',
  styleUrls: ['./projectes.component.scss']
})
export class ProjectesComponent implements OnInit {
  
  public projectes3F : any = [];

  public loading = {
    projectes: false,
    projecte: false,
  }

  constructor(private connection: ConnectionService, private storage: StorageService) { }

  ngOnInit(): void {
    this.getProjectes3F()
  }

  _getProjectes3F() {
    this.loading.projectes = true;
    this.connection.getMyProjects().subscribe(
      data => {
        console.log(data);
        this.projectes3F = data.Projects;
        this.loading.projectes = false;
      },
      error => {
        //this.snackbar("Error baixant activitats.");
      }
    );
  }

  getProjectes3F() {
    this.loading.projectes = true;
    this.connection.getFullsSeguiment3FStudent(this.storage.getPersonRid().slice(1)).subscribe(
      data => {
        console.log(data);
        this.projectes3F = data;
        this.loading.projectes = false;
      },
      error => {
        //this.snackbar("Error baixant projectes.");
      }
    );
  }

  projectInStatus(status : any) {
    console.log(status)
    console.log(this.projectes3F.filter((x: { [x: string]: number; }) => x['status'] == status))
    return this.projectes3F.filter((x: { [x: string]: number; }) => x['status'] == status).length != 0
  }

}
