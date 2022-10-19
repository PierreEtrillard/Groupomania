export class Post {
    id?:string;
    title!:string;
    authorId?:string;
    authorName?:string;
    createdAt?:Date;
    imageUrl?:string;
    textContent!:string;
    comments?:string;
    likers?:string[];
}
