export class UserAccount{
    id?:number;
    firstName?:string;
    lastName?:string;
    
    constructor(id?:number,firstName?:string,lastName?:string){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
    }

    //toString(){return this.id + ', ' +this.firstName + this.lastName;}

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
        this.id = id;
        this.userAccount=userAccount;
        this.message = message;
    }

    //toString(){return this.id + ', ' + this.userAccount.toString() + ', ' + this.message;}

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