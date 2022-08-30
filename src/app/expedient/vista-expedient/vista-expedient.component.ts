import { Component, OnInit,Input} from '@angular/core';
import { ConnectionService } from '../../services/connection.service';

@Component({
  selector: 'app-vista-expedient',
  templateUrl: './vista-expedient.component.html',
  styleUrls: ['./vista-expedient.component.css']
})
export class VistaExpedientComponent implements OnInit {
  public registrationForms = [];
  public convocatories = [];
  public notaMateria = 0;
  public markTypeVisualization = 'computedMarks';
  public loading = false;
  public marksBeforeDate = new Date();

  @Input() person = null;

  constructor(private connection:ConnectionService) { }

  ngOnInit(): void {
    this.getExpedient();
  }

  getExpedient() {
    this.registrationForms = [];
    this.convocatories = [];
    this.notaMateria = 0;
  
    if (this.person == null) {
      this.connection.getRegistrationFormsOfStudent().subscribe(
        data => this.registrationForms = data,
        error => console.log(error)
      );  
    } else {
      this.connection.getRegistrationFormsOfStudentByRfid(this.person.rid.substring(1)).subscribe(
        data => this.registrationForms = data,
        error => console.log(error)
      );  
    }
  }

  selecciona(rf) {
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


  colorPerStandardGradient(standard) {

    if (standard['teacherMarks'].length > 0) var val = (4-standard['teacherMarks'][0].value)/3 ; // de 0 a 1
    else var val = (4-standard['computedMarks'][0].value)/3 ; // de 0 a 1
    var cI_old = [249, 199, 79, 1];

    var cI = [255, 255, 255, 1];
    var cF_old = [144, 190, 109, 1];

    var cF = [77, 144, 142, 1];
    var color = [0,0,0,1];
    for (var i=0; i<3; i++) {
      color[i] = parseInt((cI[i] + (cF[i]-cI[i]) * val).toString())
    }
 // return 'rgba('+cF[0]+','+cF[1]+','+cF[2]+',1)'
    return 'rgba('+color[0]+','+color[1]+','+color[2]+',1)'
  }

  textPerNota(valor) {
    return ['10', '7.5', '5.0', '2.5'][valor-1];
  }

  notaSobre10(valor) {
    return Math.round((4-valor) * 3.333 * 10) / 10;
  }

  reseteja(){
    this.convocatories = [];
    this.notaMateria = 0;
  }

}
