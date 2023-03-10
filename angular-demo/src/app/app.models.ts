export class UserAccount{
    id?:number;
    firstName?:string;
    lastName?:string;
    
    constructor(id?:number,firstName?:string,lastName?:string){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
    }

    getPickName(){
        return this.id+') '+this.firstName+' '+this.lastName;
    }
    getFullName(){
        return this.firstName+' '+this.lastName;
    }

    validate(){
        if(this.firstName==undefined){this.firstName='';}
        if(this.lastName==undefined){this.lastName='';}
    }
    
    toJSON(){
        this.validate();
        return {
          id: this.id,
          firstName:this.firstName,
          lastName:this.lastName
        }
    }

    public static parse(jsonData:any){
        return new UserAccount(jsonData['id'],jsonData['firstName'],jsonData['lastName']);
    }
}

export class UserMessage{
    id?:number;
    userAccount?:UserAccount;
    message?:string;

    constructor(id?:number, userAccount?:UserAccount, message?:string){
        console.log('UserMessage.constructor');
        this.id = id;
        if(userAccount==null||userAccount==undefined){
            userAccount=new UserAccount();
        }
        this.userAccount=userAccount;
        this.message=message;
    }
    
    validate(){
        if(this.userAccount==null||this.userAccount==undefined){this.userAccount=new UserAccount();}
        if(this.message==undefined){this.message='';}
    }

    toJSON(){
        this.validate();
        return {
          id: this.id,
          userAccount:this.userAccount?.toJSON(),
          message:this.message
        }
    }

    public static parse(jsonData:any){
        return new UserMessage(jsonData['id'],UserAccount.parse(jsonData['userAccount']),jsonData['message']);
    }
}