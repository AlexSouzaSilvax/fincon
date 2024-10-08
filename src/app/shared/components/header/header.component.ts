import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/fincon/services/local-storage.service';
import { API } from '../../Util';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  username: string;
  base: string;

  constructor(
    private serviceLS: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.username = this.serviceLS.get('username');
    this.base = API.name;
  }

  ngOnInit(): void {}

  onLogout() {
    this.serviceLS.clear();
    this.router.navigate([''], { relativeTo: this.route });
  }

  usuario() {
    this.router.navigate(['usuario'], { relativeTo: this.route });
  }
}
