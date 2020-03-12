import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editable-star-rating',
  templateUrl: './editable-star-rating.component.html',
  styleUrls: ['./editable-star-rating.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableStarRatingComponent implements OnInit {

  @Input() stars: number;
  @Input() editable: boolean;
  @Output() setStarsEmitter = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  setStars(numberOfStars: number) {
    this.stars = numberOfStars
    this.setStarsEmitter.emit(numberOfStars);
  }

}
