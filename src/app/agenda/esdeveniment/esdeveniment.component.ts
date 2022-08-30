import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esdeveniment',
  templateUrl: './esdeveniment.component.html',
  styleUrls: ['./esdeveniment.component.css']
})
export class EsdevenimentComponent implements OnInit {
  @Input() esdeveniment;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
