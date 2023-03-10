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
  
  active:boolean=true;
  selected?:string='none';
  data:UserAccount[] = [];
  count:number=0;
  @Output() sendNotification = new EventEmitter<string>();

  ngOnInit(changes: SimpleChanges) {
    console.log('table-user-account.ngOnInit');
    this.refresh();
  }
  
  refresh() {
    console.log('table-user-account.refresh');
    if(this.active){
      this.http.get<UserAccount[]>(AppConfig.USER_ACCOUNT).subscribe(data=>{
        this.data=[];
        data.forEach(element => {
          this.data.push(UserAccount.parse(element));
        });
      });
    }
  }
  delete(value: number) {
    console.log('table-user-account.delete');
    this.http.delete<any>(AppConfig.USER_ACCOUNT + value ).subscribe(()=>{this.refresh();});
  }
  select(value?: number) {
    console.log('table-user-account.select('+value+')');
    this.active=false;
    if(value==null || value==undefined){
      this.selected=undefined;
    }else{
      this.selected=value!.toString();
    }
  }
  close() {
    console.log('table-user-account.close');
    this.active=false;
    this.sendNotification.emit('');
  }
  
  getNotification(value: string) {
    console.log('table-user-account.getNotification');
    this.active=true;
    this.selected='none';
    this.refresh();
  }

}
