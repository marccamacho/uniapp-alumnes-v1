import { Component, OnInit, Input }   from '@angular/core';
import { Router, ActivatedRoute }     from '@angular/router';
import { StorageService }             from '../services/storage.service';
import { environment }                from '../../environments/environment';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})

export class TopbarComponent implements OnInit {
  @Input() person: any = {};
  lsPerson: any = undefined;
  roles = undefined;
  letter:string = "";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private storage: StorageService) {   
    setTimeout(() => {
      this.person = this.storage.getPerson();
      this.letter = this.person.name[0]
      this.roles = this.storage.getRoles();
    }, 50);
  }

  ngOnInit(): void {
    this.roles = this.storage.getRoles();
    this.person = this.storage.getPerson();
  }

  logout() {
    this.storage.clear();
    const continueString = 'http://' + environment.loginHost + '?continue=' + window.location.href.split('#')[0] ;
    window.location.href = continueString + '%2F%23%2F'  ;
}
}
