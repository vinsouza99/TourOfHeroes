import { Component, Input, ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent{
  constructor(
    private heroService:HeroService
  ){}

  @ViewChild('picturePreviewImg') img:ElementRef | undefined;


  @Input()
  requiredFileType:string= "image/*";
  model : Hero= {id:0, name:null, alias:null,picture:"noimage.png", powers:[], blob:null, description:null};
  powersList: string = "";
  fileName: string = "";
  picture: File | undefined;

  submitted = false;

  ngOnInit() : void {
    this.heroService.getHeroes()
    .subscribe(heroes => {
      const nextId = heroes.length + 1;
      this.model = {id:nextId, name:null, alias:null, picture:"noimage.png", powers:[], blob: null, description:null};
    });

  }

  onSubmit() { 
    console.log(this.model);
    if(this.powersList !== ""){
      this.model.powers = this.powersList.split(",");
    }
    if(this.modelIsAbleToBeAdded()){
      if(this.picture){
        var bb = new Blob([this.picture ], { type: this.requiredFileType });
        this.model.blob = bb;
        this.model.picture = this.fileName;
      }
      this.heroService.addHero(this.model)
        .subscribe(() => { 
          console.log("Hero added successfully");
          this.submitted = true;
        });
    }
  }
  ngOnDestroy(){
  }
  onFileSelected(event:any) {
    const file:File = event.target.files[0];

    if (file && this.img) {
      this.fileName = file.name;
      this.picture = file;
      this.img.nativeElement.setAttribute('src',URL.createObjectURL(file));
    }
  }
  modelIsAbleToBeAdded():boolean {
    return (this.model.name != null) && (this.model.alias != null);
  }
}
