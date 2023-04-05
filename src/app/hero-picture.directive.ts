import { Directive,ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHeroPicture]'
})
export class HeroPictureDirective {

  public elem: ElementRef;
  public renderer: Renderer2;

  constructor(elem: ElementRef, renderer: Renderer2) {
    this.elem = elem;
    this.renderer = renderer;
    renderer.setAttribute(elem.nativeElement, "src", "../assets/heroes-pictures/noimage.png");
  }

  changeSource(src:string){
    this.renderer.setAttribute(this.elem.nativeElement, "src", src);
  }

}
