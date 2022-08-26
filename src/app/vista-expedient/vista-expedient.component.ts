import { Component, OnInit, Input } from '@angular/core';
import { ConnectionService }             from '../services/connection.service';
import { Person }           from '../interfaces/person';

@Component({
  selector: 'app-vista-expedient',
  templateUrl: './vista-expedient.component.html',
  styleUrls: ['./vista-expedient.component.scss']
})
export class VistaExpedientComponent implements OnInit {

  constructor(private connection: ConnectionService) { }

  ngOnInit(): void {
  }

/*   getExpedient() {
    this.registrationForms = [];
    this.convocatories = [];
    this.notaMateria = 0;
  
    if (this.person == null || this.person != undefined ) {
      this.connection.getRegistrationFormsOfStudent().subscribe({
        next : (data : any) => { this.registrationForms = data },
        error : (error : any) => {console.log(error) }
      });     
    } else {
      this.connection.getRegistrationFormsOfStudentByRfid(this.person.rid.substring(1)).subscribe({
        next : (data : any) => { this.registrationForms = data },
        error : (error : any) => {console.log(error) }
      });  
    }
  }

  selecciona(rf:any) {
    this.loading = true;
    console.log(this.marksBeforeDate.toISOString().split('T')[0]);
    this.connection.getAcademicCallsOfRegistrationFormBeforeDate(rf, this.marksBeforeDate.toISOString().split('T')[0]).subscribe(
      data => {
        this.convocatories = data;
        console.log(this.convocatories);
        this.convocatories.sort((a,b) => (a.subject.name > b.subject.name) ? 1 : ((b.subject.name > a.subject.name) ? -1 : 0))
        this.loading = false;
      },
      error => console.log(error)
    );
  }

  ngOnChanges() {
    console.log("HELLO")
    this.getExpedient();

  }
 */}
