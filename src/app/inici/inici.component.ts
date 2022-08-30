import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-inici',
  templateUrl: './inici.component.html',
  styleUrls: ['./inici.component.scss']
})
export class IniciComponent implements OnInit {
  
  // Variables

  public lastActivities = [];
  public lastsMarks = [];
  public agenda = [];
  public loading = {
    lastsMarks: false,
    agenda: false,
  }

  // Funcions

  constructor(private connection: ConnectionService) {
  }
 
  ngOnInit(): void {
    //this.getLastMarks();
    this.getNextActivities();
  }

  getLastMarks() {
    this.loading.lastsMarks = true;
    this.connection.getLastMarksForStudentAndLimitDate().subscribe({
      next : data => {
        this.lastsMarks = data;
        this.loading.lastsMarks = false;
      },
      error: error => {
        this.loading.lastsMarks = false;
        console.log(error)
      }
    });
  }

  getNextActivities() {
    this.loading.agenda = true;
    this.connection.getProgramedActivitiesOfGroup('14:183').subscribe({
      next : data => {
        this.lastActivities = this.passaProjectesAActivitats(data);
        console.log(this.lastActivities);
        this.agenda = data;
        this.loading.agenda = false;
      },
      error : error => {
        //this.snackbar("Error baixant activitats.");
        console.log(error);
        this.loading.agenda = false;
      }
    });
  }

  passaProjectesAActivitats(projectes : any) {
    return projectes.map((i: { [x: string]: any[]; }) => i['activities'][0])
  }


  notaAText(value: any) {
    return ['Mestratge','Avançat','Aprenent','Iniciat'][value-1];
  }
}
