export class User {
static photo(photo: any) {
  throw new Error('Method not implemented.');
}
id!:string;
name!:string; 
email!:string; 
password!:string; 
photo?:string; 
myLikes?:string[];
role?:string;
lastConnectAt!:number;
connectAt!:number;
}
