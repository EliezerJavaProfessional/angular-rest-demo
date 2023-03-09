import { Component, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppConfig } from '../app.config';

@Component({
  selector: 'app-table-user-message',
  templateUrl: './table-user-message.component.html',
  styleUrls: ['../app.component.css']
})
export class TableUserMessageComponent {
  constructor(private http: HttpClient) { }

  selected?:string='none';
  data = [];
  count = '';
  @Output() sendNotification = new EventEmitter<string>();

  ngOnInit(changes: SimpleChanges) {this.refresh();}

  refresh() {this.http.get<any>(AppConfig.USER_MESSAGES).subscribe(data=>{this.data=data;});}
  delete(value: string) {this.http.delete<any>(AppConfig.USER_MESSAGES + value).subscribe(()=>{this.refresh();});}
  select(value: string) {this.selected=value;}
  close() {this.sendNotification.emit('');}

  getNotification(value: string) {
    this.selected='none';
    this.refresh();
  }
}
