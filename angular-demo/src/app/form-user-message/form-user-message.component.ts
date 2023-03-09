import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserAccount, UserMessage } from '../app.models';
import { AppConfig } from '../app.config';

@Component({
  selector: 'app-user-message',
  templateUrl: './form-user-message.component.html',
  styleUrls: ['../app.component.css']
})

export class FormUserMessageComponent {
  constructor(private http: HttpClient) {this.refresh();}

  @Input() id:string='';
  record=new UserMessage(undefined,new UserAccount(undefined, '', ''),'');
    
  @Output() sendNotification = new EventEmitter<string>();
  
  ngOnChanges(changes: SimpleChanges) {
    this.refresh();    
  }

  change(input:string, event: any){
    console.log('change');
    console.log(input + ":" + event.target.value);
    if (input==='userAccountId'){this.record.userAccount!.id=event.target.value;}
    else if (input==='message'){this.record.message=event.target.value;}
  }
  
  new(){
    this.id = '';
    this.record = new UserMessage(undefined,new UserAccount(undefined, '', ''),'');
  }

  refresh() {
    console.log('refresh');
    if(this.id!='' && this.id!='0'){
      this.http.get<any>(AppConfig.USER_MESSAGES+this.id).subscribe(data=>{
        console.log(data);
        this.id = data.id;
        this.record=UserMessage.parse(data);
      });
    }
  }

  save() {
    console.log('save');
    console.log(this.record);
    if(this.id===''){
      console.log('insert');
      console.log(this.record.toJSON());
      console.log(JSON.stringify(this.record.toJSON()));
      this.http.post<any>(AppConfig.USER_MESSAGES, this.record.toJSON()).subscribe(data => {
        console.log(data);
        this.id = data.id;
        this.record=UserMessage.parse(data);
      })
    }else{
      console.log('update');
      console.log(this.record.toJSON());
      console.log(JSON.stringify(this.record.toJSON()));
      this.http.put<any>(AppConfig.USER_MESSAGES+this.id, this.record.toJSON()).subscribe(data => {
        console.log(data);
        this.id = data.id;
        this.record=UserMessage.parse(data);
      })
    }
  }
  close() {
    console.log('close');
    this.sendNotification.emit('');
  }
}
