import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../app.config';
import { UserAccount, UserMessage } from '../app.models';

@Component({
  selector: 'app-form-user-message',
  templateUrl: './form-user-message.component.html',
  styleUrls: ['../app.component.css']
})
export class FormUserMessageComponent {
  constructor(private http: HttpClient) {
    console.log('form-user-message.constructor');
    this.initialize();
  }

  @Input() id?:string;
  record:UserMessage=new UserMessage();
  data:UserAccount[]=[];
  @Output() sendNotification = new EventEmitter<string>();
  
  ngOnChanges(changes: SimpleChanges) {
    console.log('form-user-message.onChanges(changes='+JSON.stringify(changes)+')');
    this.refresh();
  }
  change(input:string, event: any){
    console.log('form-user-message.change(input='+input+', event.target.value='+event.target.value+')');
    if (input==='userAccount.id'){this.record.userAccount!.id=event.target.value;}
    else if (input==='message'){this.record.message=event.target.value;}
  }
  new(){
    console.log('form-user-message.new');
    this.id=undefined;
    this.record = new UserMessage();
  }
  initialize(){
    console.log('form-user-message.initialize()');
    this.http.get<UserAccount[]>(AppConfig.USER_ACCOUNT).subscribe(data=>{
      console.log(data);
      this.data=[];
      data.forEach(element => {
        this.data.push(UserAccount.parse(element));
      });
    });
  }
  refresh() {
    console.log('form-user-message.refresh(id:'+this.id+')');
    if(this.id!=null && this.id!=undefined && this.id!=''){
      this.http.get<UserMessage>(AppConfig.USER_MESSAGE+this.id).subscribe(data=>{
        console.log(data);
        this.record=UserMessage.parse(data);
      });
    }
  }
  save() {
    console.log('form-user-message.save');
    console.log(this.record);
    if(this.id==undefined || this.id==''){
      console.log('form-user-message.save.insert');
      console.log(this.record.toJSON());
      this.http.post<UserMessage>(AppConfig.USER_MESSAGE, this.record.toJSON()).subscribe(data => {
        console.log(data);
        this.id = data['id']?.toString();
        this.record=UserMessage.parse(data);
      })
    }else{
      console.log('form-user-message.save.update');
      console.log(this.record.toJSON());
      console.log(JSON.stringify(this.record.toJSON()));
      this.http.put<UserMessage>(AppConfig.USER_MESSAGE+this.id, this.record.toJSON()).subscribe(data => {
        console.log(data);
        this.id = data['id']?.toString();
        this.record=UserMessage.parse(data);
      })
    }
  }
  delete() {
    console.log('form-user-message.delete');
    if(this.id!=null && this.id!=undefined && this.id!=''){
      this.http.delete<undefined>(AppConfig.USER_MESSAGE + this.id).subscribe(() => {this.sendNotification.emit('');});
    }
  }
  close() {
    console.log('form-user-message.close');
    this.sendNotification.emit('');
  }
}
