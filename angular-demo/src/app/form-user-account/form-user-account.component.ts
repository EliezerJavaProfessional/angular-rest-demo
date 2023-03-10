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
  constructor(private http: HttpClient) {
    console.log('form-user-account.constructor');
  }

  @Input() id?:string;
  record = new UserAccount();
  @Output() sendNotification = new EventEmitter<string>();
  
  ngOnChanges(changes: SimpleChanges) {
    console.log('form-user-account.onChanges('+JSON.stringify(changes)+')');
    this.refresh();    
  }

  change(input:string, event: any){
    console.log('form-user-account.input');
    console.log(input + ":" + event.target.value);
    if (input==='firstName'){this.record.firstName=event.target.value;}
    else if (input==='lastName'){this.record.lastName=event.target.value;}
  }
  
  new(){
    console.log('form-user-account.new');
    this.id=undefined;
    this.record = new UserAccount();
  }

  refresh() {
    console.log('form-user-account.refresh(id:'+this.id+')');
    if(this.id!=null && this.id!=undefined && this.id!=''){
      this.http.get<any>(AppConfig.USER_ACCOUNT + this.id).subscribe(data=>{
        console.log(data);
        this.record=UserAccount.parse(data);
      });
    }
  }
  save() {
    console.log('form-user-account.save');
    console.log(this.record);
    if(this.id==undefined || this.id==''){
      console.log('form-user-account.save.insert');
      console.log(this.record.toJSON());
      this.http.post<any>(AppConfig.USER_ACCOUNT, this.record.toJSON()).subscribe(data => {
        console.log(data);
        this.id = data['id'];
        this.record=UserAccount.parse(data);
      })
    }else{
      console.log('form-user-account.save.update');
      console.log(this.record.toJSON());
      console.log(JSON.stringify(this.record.toJSON()));
      this.http.put<any>(AppConfig.USER_ACCOUNT + this.id, this.record.toJSON()).subscribe(data => {
        console.log(data);
        this.id = data['id'];
        this.record=UserAccount.parse(data);
      })
    }
  }
  delete() {
    console.log('form-user-account.delete');
    if(this.id!=undefined && this.id!=''){
      this.http.delete<any>(AppConfig.USER_ACCOUNT + this.id).subscribe(() => {this.sendNotification.emit('');});
    }
  }
  close() {
    console.log('form-user-account.close');
    this.sendNotification.emit('');
  }
}
