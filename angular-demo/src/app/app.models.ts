export class UserAccount{
    id?:number;
    firstName?:string;
    lastName?:string;
    active?:boolean;
    
    constructor(id?:number, firstName?:string, lastName?:string, active?:boolean){
        this.id=id;
        if(firstName==null || firstName==undefined){firstName='';}
        this.firstName=firstName;
        if(lastName==null || lastName==undefined){lastName='';}
        this.lastName=lastName;
        if(active==null || active==undefined){active=false;}
        this.active=active;
    }

    getPickName(){
        return this.id+' - '+this.firstName+' '+this.lastName;
    }

    getFullName(){
        return this.firstName+' '+this.lastName;
    }

    validate(){
        if(this.firstName==undefined){this.firstName='';}
        if(this.lastName==undefined){this.lastName='';}
        if(this.active==undefined){this.active=false;}
    }
    
    toJSON(){
        this.validate();
        return {
          id: this.id,
          firstName:this.firstName,
          lastName:this.lastName,
          active:this.active
        }
    }

    public static parse(jsonData:any){
        return new UserAccount(jsonData['id'],jsonData['firstName'],jsonData['lastName'], jsonData['active']);
    }
}

export class UserMessage{
    id?:number;
    userAccount?:UserAccount;
    message?:string;

    constructor(id?:number, userAccount?:UserAccount, message?:string){
        this.id = id;
        if(userAccount==null || userAccount==undefined){userAccount=new UserAccount();}
        this.userAccount=userAccount;
        this.message=message;
    }
    
    toJSON(){
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