import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import {UserAccount} from '../app.models';

@Component({
  selector: 'app-form-user-account',
  templateUrl: './form-user-account.component.html',
  styleUrls: ['../app.component.css']
})

export class FormUserAccountComponent {
  constructor(private http: HttpClient) {this.refresh();}

  @Input() id?:string=undefined;
  record = new UserAccount(undefined,'','');
  @Output() sendNotification = new EventEmitter<string>();
  
  ngOnChanges(changes: SimpleChanges) {
    console.log("# # # # # "+this.id+" # # # #");
    this.refresh();    
  }
  change(input:string, event: any){
    console.log(input + ":" + event.target.value);
    if (input==='firstName'){this.record.firstName=event.target.value;}
    else if (input==='lastName'){this.record.lastName=event.target.value;}
  }
  
  new(){
    this.id=undefined;
    this.record = new UserAccount();
  }

  refresh() {
    if(this.id!=undefined){
      this.http.get<any>(AppConfig.USER_ACCOUNT + this.id).subscribe(data=>{
        console.log(data);
        this.record=UserAccount.parse(data);
      });
    }
  }

  save() {
    console.log(this.record);
    if(this.id==undefined){
      this.http.post<any>(AppConfig.USER_ACCOUNT, this.record.toJSON()).subscribe(data => {
        console.log(data);
        this.id = data['id'];
        this.record=UserAccount.parse(data);
      })
    }else{
      console.log('update');
      this.http.put<any>(AppConfig.USER_ACCOUNT + this.id, this.record.toJSON()).subscribe(data => {
        console.log(data);
        this.id = data['id'];
        this.record=UserAccount.parse(data);
      })
    }
  }
  close() {this.sendNotification.emit('');}
}
