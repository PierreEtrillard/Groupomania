export class Post {
    id:string;
    title!:string;
    author?:string;
    authorPhoto?:string;
    createdAt?:number;
    imageUrl?:string;
    textContent!:string;
    comments?:string;
    likers:string[];
}
