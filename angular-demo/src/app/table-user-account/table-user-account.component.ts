import { Component, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AppConfig } from '../app.config';
import { UserAccount } from '../app.models';

@Component({
  selector: 'app-table-user-account',
  templateUrl: './table-user-account.component.html',
  styleUrls: ['../app.component.css']
})
export class TableUserAccountComponent {
  constructor(private http: HttpClient) { }

  selected?:string='none';
  data:UserAccount[] = [];
  count:number=0;
  @Output() sendNotification = new EventEmitter<string>();

  ngOnInit(changes: SimpleChanges) {this.refresh();}
  
  refresh() {
    this.http.get<UserAccount[]>(AppConfig.USER_ACCOUNT).subscribe(data=>{
      this.data=[];
      data.forEach(element => {
        this.data.push(UserAccount.parse(element));
      });
    });
  }
  delete(value: number) {this.http.delete<any>(AppConfig.USER_ACCOUNT + value ).subscribe(()=>{this.refresh();});}
  select(value?: number) {this.selected=value?.toString();}
  close() {this.sendNotification.emit('');}
  
  getNotification(value: string) {
    this.selected='none';
    this.refresh();
  }

}
