import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { Comment } from '../comment';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { CommentsService } from '../comments.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  hero: Hero | undefined;
  commentModel : Comment = { id:2, username:"Anonymous", dateTime: "", heroId:0, comment:"", userDownvoted:false, userUpvoted:false, upVotes: 0, downVotes:0};
  comments: Comment[] = [];
  editMode: boolean = false;
  powers: String[] = [];
  powersExist: boolean = true;
  loaded: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private commentService:CommentsService
  ){}

  ngOnInit() : void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
    .subscribe(hero => {
      this.hero = hero;
      this.loaded = true;
      if(this.hero){
        this.powers = this.hero.powers;
        if(this.powers.length===0){
          this.powersExist = false;
        }
        this.getComments(this.hero.id);
      }
    });
  }
  
  getComments(heroId:number):void {
    this.commentService.getCommentsOfHero(heroId)
    .subscribe(comments => {
        this.comments = comments;
      }
    );
  }
  voteComment(commentId:number, upVote:boolean): void{
    const commentUpVotesCounter = '#upvotes-'+commentId;
    const commentDownVotesCounter = '#downvotes-'+commentId;
    const comment = this.comments.find(comment => comment.id === commentId);

    if(comment){
      if(upVote){
        if(!comment.userUpvoted){
          $(commentUpVotesCounter).removeClass("unvoted");
          $(commentUpVotesCounter).addClass("voted");
          comment.upVotes++;
          if(comment.userDownvoted){
            $(commentDownVotesCounter).removeClass("voted");
            $(commentDownVotesCounter).addClass("unvoted");
            comment.downVotes--;
            comment.userDownvoted = false;
          }
          comment.userUpvoted = true;
          this.commentService.updateComment(comment);
        }else{
          console.log("here");
          $(commentUpVotesCounter).removeClass("voted");
          $(commentUpVotesCounter).addClass("unvoted");
          comment.upVotes--;
          comment.userUpvoted = false;
          this.commentService.updateComment(comment);
        }
      }else{
        if(!comment.userDownvoted){
          $(commentDownVotesCounter).removeClass("unvoted");
          $(commentDownVotesCounter).addClass("voted");
  
          comment.downVotes++;
          if(comment.userUpvoted){
            $(commentUpVotesCounter).removeClass("voted");
            $(commentUpVotesCounter).addClass("unvoted");
            comment.upVotes--;
            comment.userUpvoted = false;
          }
          comment.userDownvoted = true;
          this.commentService.updateComment(comment);
        }else{
          $(commentDownVotesCounter).removeClass("voted");
          $(commentDownVotesCounter).addClass("unvoted");
          comment.downVotes--;
          comment.userDownvoted = false;
          this.commentService.updateComment(comment);
        }
      }
    }
  }
  onSubmitComment(){
    this.commentModel.dateTime=new Date().toLocaleString();
    if(this.hero){
      this.commentModel.heroId = this.hero.id;
    }
    console.log(this.commentModel);
    this.commentService.addComment(this.commentModel)
    .subscribe(() => { 
      console.log("Comment added successfully");
      this.commentModel.id++;
      this.commentModel.comment="";
      if(this.hero){
        this.getComments(this.hero.id);
      }
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  save(){
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.toggleEditMode());
    }
    
  }
}
