import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/fincon/services/local-storage.service';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  login: string;

  constructor(
    private serviceLS: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.login = this.serviceLS.get('login');
  }

  ngOnInit(): void {}

  onLogout() {
    this.serviceLS.clear();
    this.router.navigate([''], { relativeTo: this.route });
  }
}
