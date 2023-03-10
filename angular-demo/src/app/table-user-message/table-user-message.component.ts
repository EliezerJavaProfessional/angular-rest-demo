import { Component, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppConfig } from '../app.config';
import { UserMessage } from '../app.models';

@Component({
  selector: 'app-table-user-message',
  templateUrl: './table-user-message.component.html',
  styleUrls: ['../app.component.css']
})
export class TableUserMessageComponent {
  constructor(private http: HttpClient) { }

  selected?:string='none';
  data:UserMessage[] = [];
  count:number=0;
  @Output() sendNotification = new EventEmitter<string>();

  ngOnInit(changes: SimpleChanges) {this.refresh();}

  refresh() {
    this.http.get<UserMessage[]>(AppConfig.USER_MESSAGE).subscribe(data=>{
      this.data=[];
      data.forEach(element => {
        this.data.push(UserMessage.parse(element));
      });
    });
  }
  delete(value: number) {this.http.delete<any>(AppConfig.USER_MESSAGE + value).subscribe(()=>{this.refresh();});}
  select(value?: number) {
    if(value==null || value==undefined){
      this.selected=undefined;
    }else{
      this.selected=value!.toString();
    }
  }
  close() {this.sendNotification.emit('');}

  getNotification(value: string) {
    this.selected='none';
    this.refresh();
  }
}
