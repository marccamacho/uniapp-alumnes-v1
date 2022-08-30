import { Component, OnInit } from '@angular/core';
import { ConnectionService } from '../../services/connection.service';
import { StorageService } from '../../services/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vista-tutor',
  templateUrl: './vista-tutor.component.html',
  styleUrls: ['./vista-tutor.component.css']
})
export class VistaTutorComponent implements OnInit {

  public teamsITeach  = [];
  public person;
  public esProfe      = false;
  public loading      = { favorits: false, equips: false }
  public equip        = null;
  public membership   = null;
  public alumne       = null;

  constructor(private connection: ConnectionService, private storage: StorageService, private _snackBar: MatSnackBar) { 

  }

  ngOnInit(): void {
    this.person = this.storage.getPerson();
    let rols = this.storage.getRoles()
    this.esProfe = (rols.indexOf('teacher') > -1);

    if (this.esProfe) {
      this.getTeamsITeach();
    }
  }

  getTeamsITeach() {
    this.loading.equips = true;
    this.connection.getTeamsIamTeacher().subscribe(
      data => {
        this.teamsITeach = data['iTeachTeams'];
        this.loading.equips = false;
      },
      error => {
        this.snackbar("Error baixant grups d'alumnes.")
      }
    );
  }

  seleccionaEquip(equip) {
    this.connection.getTeam(equip.rid.slice(1)).subscribe(
      data => {this.equip=data;
                console.log(this.equip);
                this.membership=this.equip.memberships[0]; console.log(this.membership)      },
      error => console.log(error)
    );
  }

  snackbar(missatge) {
    this._snackBar.open(missatge, "", {
      duration: 2000,
    });
  }

}
