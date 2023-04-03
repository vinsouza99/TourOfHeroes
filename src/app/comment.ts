//{comment:"Test", replies: [], upVotes: 0, downVotes:0},
export interface Comment {
    id:number;
    username:String;
    dateTime: String;
    heroId:number;
    comment:String;
    userDownvoted: boolean;
    userUpvoted:boolean;
    upVotes:number;
    downVotes:number;
}
