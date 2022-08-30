import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-setmana',
  templateUrl: './setmana.component.html',
  styleUrls: ['./setmana.component.css']
})
export class SetmanaComponent implements OnInit {
  @Input() setmana;

  constructor() { }

  ngOnInit(): void {
  }

}
