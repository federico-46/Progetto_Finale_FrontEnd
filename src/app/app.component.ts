import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loggedIn = false;

  ngOnInit() {
    this.loggedIn = localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
    window.setTimeout('window.location.reload()', 500);
  }
}
