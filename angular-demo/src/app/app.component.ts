import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Demo App';
  selected='app-root';
  select(value: string){this.selected=value;}
  getNotification(value: string) {this.selected='app-root';}
}
