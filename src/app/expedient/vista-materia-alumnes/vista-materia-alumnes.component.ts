import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

import { ConnectionService } from '../../services/connection.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AvaluaCriteriDialegComponent } from '../../shared/avalua-criteri-dialeg/avalua-criteri-dialeg.component';


@Component({
  selector: 'app-vista-materia-alumnes',
  templateUrl: './vista-materia-alumnes.component.html',
  styleUrls: ['./vista-materia-alumnes.component.css']
})
export class VistaMateriaAlumnesComponent implements OnInit {
  public subjectId = null;
  public convocatories = [];
  public pesos = [];
  // public selectedPersons = [];
  public persons = [];
  public matriuNotes = {};
  public dictPersonesNota = {};
  public terms = [];
  public selectedTerm = null;
  public subject;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private connection: ConnectionService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subjectId = this.route.snapshot.paramMap.get('id');

    this.connection.getAcademicCallsOfSubject(this.subjectId).subscribe(
      data => {
        console.log(data);
        this.convocatories = data;

        // this.matriuNotes = this.getMatriuNotesFromData(data);
        this.matriuNotes = this.getMatriuNotesFromDataV2(data);
        this.persons = this.getPersonsFromData(data);
        this.pesos = this.getPesosFromData(data);
        this.terms = this.getTermsFromData(data);
        this.subject = this.getSubjectFromData(data);
        console.log(this.matriuNotes)
      },
      error => console.log(error)
    );
  }

  getSubjectFromData(data) {
    if (data.length > 0) {
      return data[0].subject;
    }
    return null;
  }

  getPersonsFromData(data) {
    return data.map(i => i.person);
  }

  getPesosFromData(data) {
    if (data.length > 0) {
      return data[0].subject.markWeights;
    }
    return [];
  }

  valorNota(mark) {
    if (mark == null) return 0;
    console.log(mark)
    var valor = [10, 7.5, 5, 2.5][Math.round(mark.value) - 1]
    return valor;
  }

  // trobaDarreraNota(standard) {
  //   // troba la darrera nota d'un standard que conté notes
  //   var darreraNota = null;
  //   standard.teacherMarks.forEach(mark => {
  //     if (darreraNota == null || darreraNota.date < mark.date) {
  //       darreraNota = mark;
  //     }
  //   });
  //   if (darreraNota != null) return darreraNota;
  //
  //   standard.computedMarks.forEach(mark => {
  //     if (darreraNota == null || darreraNota.date < mark.date) {
  //       darreraNota = mark;
  //     }
  //   });
  //   return darreraNota;
  // }

  getMatriuNotesFromDataV2(data) {
    var matriu = {};
    console.log(matriu);
    for (var j = 0; j < data.length; j++) {
      var convocatoria = data[j];
      matriu[convocatoria.person.rid] = {}
      this.dictPersonesNota[convocatoria.person.rid] = convocatoria.marks[0].value;

      for (var i = 0; i < convocatoria.subject.markWeights.length; i++) {
        var pes = convocatoria.subject.markWeights[i];
        if (pes.standard.teacherMarks.length>0) {
          matriu[convocatoria.person.rid][pes.standard.rid] = pes.standard.teacherMarks;
        }
        else {
          matriu[convocatoria.person.rid][pes.standard.rid] = pes.standard.computedMarks;
        }
      }
    }
    return matriu;
  }

  // calculaNotaMateria(c, matriu) {
  //   c.nota = 0;
  //   var teacherMark = true;
  //   c.subject.markWeights.forEach(w => {
  //     //console.log("For each standard ", w.standard.name );
  //     var darreraNota = this.trobaDarreraNota(w.standard);
  //     if (darreraNota == null) {
  //       var valor = 0;
  //     }
  //     else if (darreraNota.value > 3.9999 && darreraNota.name=='COMPUTED') {
  //       var valor = 0;
  //     }
  //     else {
  //       var valor = [10, 7.5, 5, 2.5][Math.round(darreraNota.value) - 1]
  //     }
  //     // w.nota = Math.round(10 * valor) / 10; això no serveix de res
  //     matriu[c.person.rid][w.standard.rid] = [darreraNota];
  //     c.nota = c.nota + valor * w.value * 0.01;
  //     c.nota = Math.round(100 * c.nota) / 100
  //   });
  // }


  getTermsFromData(data) {
    var termsList = data.map(c => c.term);
    var shortTermsList = [];
    var termRidsList = [];
    termsList.forEach(element => {
      if (termRidsList.indexOf(element.rid) < 0) {
        termRidsList.push(element.rid);
        shortTermsList.push(element);
      }
    });
    if (shortTermsList.length > 0) {
      this.selectedTerm = shortTermsList[shortTermsList.length - 1];
      this.getPersonsFromTerm(this.selectedTerm);
    }
    return shortTermsList;
  }

  getPersonsFromTerm(term) {
    this.persons = this.convocatories.filter(i => i.term.rid == term.rid).map(i => i.person);
    this.selectedTerm = term;
  }

  avaluarCriteri(criteri) {
    console.log("Volem avaluar: ", criteri.name);
    console.log("Alumnes:", this.persons.length);
    let dialogRef = this.dialog.open(AvaluaCriteriDialegComponent, {
      height: '500px', width: '700px', data: { standard: criteri, studentsList: this.persons }
    });
  }

  textPerNotaStandard(standard) {
    if (standard.teacherMarks.length > 1) {
      return this.textPerNota(standard.teacherMarks[0].value);
    }
    return this.notaSobre10(standard.computedMarks[0].value);
  }

  textPerNota(valor) {
    return ['Mestratge', 'Avançat', 'Aprenent', 'Iniciat'][valor-1];
  }

  notaSobre10(valor) {
    return (4-valor) * 3.333333333;
  }

}
