import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {
  @Input() activitats = []
  public primerDia = undefined;
  public darrerDia = undefined;
  public llistaDies = [];
  public setmanes = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(canvis: SimpleChanges) {
    if (typeof canvis['activitats'] !== "undefined") {
           var canvi = canvis['activitats'];
           if (!canvi.isFirstChange()) {
               // this.llistaDies = this.construeixLlistaDeDies();
               this.setmanes = this.construeixLlistaSetmanes(this.construeixLlistaDeDies());
           }
       }
  }

  construeixLlistaDeDies() {
    if (this.activitats.length==0) return [];
    var activitats = this.activitats;
    this.primerDia = this.getDillunsAnterior(this.activitats[0].startDt);
    console.log(this.primerDia)
    this.darrerDia = this.getDiumengePosterior(this.activitats[this.activitats.length - 1].startDt);
    console.log(this.darrerDia)
    var llista = [];
    var diaAPosar = null;
    var currentDate = this.primerDia;
    while (currentDate <= this.darrerDia ) {
      diaAPosar = {'dia':new Date (currentDate),
       'activitats':this.activitats.filter(i=> new Date(i.startDt)>=currentDate && new Date(i.startDt)<=this.endema(currentDate))
     };
      llista.push(diaAPosar);
      currentDate = this.endema(currentDate);
    }
    return llista
  }

  endema(avui) {
    var dema = new Date(avui)
    dema.setDate((new Date(avui)).getDate() + 1);
    return dema;
  }

  ahir(avui) {
    var dema = new Date(avui)
    dema.setDate((new Date(avui)).getDate() - 1 );
    return dema;
  }

  getDillunsAnterior(data) {
    var dia = new Date(data);
    dia.setHours(0,0,0);
    while (dia.getDay() != 1) {
      dia = this.ahir(dia);
    }
    return dia
  }

  getDiumengePosterior(data) {
    var dia = new Date(data);
    dia.setHours(0,0,0);
    while (dia.getDay() != 0) {
      dia = this.endema(dia);
    }
    return dia
  }

  construeixLlistaSetmanes(llistaDies) {
    console.log("Dies:");
    console.log(llistaDies);
    var setmanes = [];
    var setmana = [];
    while (llistaDies.length > 0) {
      if (setmana.length == 7) {
        setmanes.push(setmana)
        setmana = [];
      }
      setmana.push(llistaDies.shift());
    }
    setmanes.push(setmana);
    console.log("Setmanes:")
    console.log(setmanes)
    return setmanes
  }


}
