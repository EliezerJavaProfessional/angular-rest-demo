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
  constructor(private http: HttpClient) {this.refresh();}

  @Input() id?:string=undefined;
  record=new UserMessage();
  @Output() sendNotification = new EventEmitter<string>();
  
  ngOnChanges(changes: SimpleChanges) {
    console.log('onChanges')
    this.refresh();    
  }
  change(input:string, event: any){
    console.log('change');
    console.log(input + ":" + event.target.value);
    if (input==='userAccount.id'){
      console.log('Before');
      console.log(this.record);
      if(this.record.userAccount==null || this.record.userAccount==undefined){
        this.record.userAccount = new UserAccount();
      }
      this.record.userAccount!.id=event.target.value;
      console.log('After');
      console.log(this.record);
    }
    else if (input==='message'){this.record.message=event.target.value;}
  }
  
  new(){
    this.id=undefined;
    this.record = new UserMessage();
  }

  refresh() {
    console.log('refresh');
    if(this.id!=undefined){
      this.http.get<any>(AppConfig.USER_MESSAGE+this.id).subscribe(data=>{
        console.log(data);
        this.record=UserMessage.parse(data);
      });
    }
  }
  save() {
    console.log('save');
    console.log(this.record);
    if(this.id==undefined || this.id==''){
      console.log('insert');
      console.log(this.record.toJSON());
      this.http.post<any>(AppConfig.USER_MESSAGE, this.record.toJSON()).subscribe(data => {
        console.log(data);
        this.id = data['id'];
        this.record=UserMessage.parse(data);
      })
    }else{
      console.log('update');
      console.log(this.record.toJSON());
      console.log(JSON.stringify(this.record.toJSON()));
      this.http.put<any>(AppConfig.USER_MESSAGE+this.id, this.record.toJSON()).subscribe(data => {
        console.log(data);
        this.id = data['id'];
        this.record=UserMessage.parse(data);
      })
    }
  }
  delete() {
    console.log('delete');
    if(this.id!=undefined && this.id!=''){
      this.http.delete<any>(AppConfig.USER_MESSAGE + this.id).subscribe(() => {this.sendNotification.emit('');});
    }
  }
  close() {
    console.log('close');
    this.sendNotification.emit('');
  }
}
