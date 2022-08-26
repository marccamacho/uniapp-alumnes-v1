import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RoutesRecognized }     from '@angular/router';

@Component({
  selector: 'app-botons-principals',
  templateUrl: './botons-principals.component.html',
  styleUrls: ['./botons-principals.component.scss']
})
export class BotonsPrincipalsComponent implements OnInit {

  paginaActual = "inici";

  constructor(private router: Router, private route:ActivatedRoute) { }

  ngOnInit() : void {
    
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        if (data.state.root.firstChild != null) this.paginaActual = data.state.root.firstChild.data['seccio'];
      }
    })
  }

  ngOnChange() : void{
    this.paginaActual = this.route.snapshot.data['seccio'];
    console.log(this.paginaActual)
  }
}
