import {AfterViewInit, Component, OnInit} from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-game-js',
  templateUrl: './game-js.component.html',
  styleUrls: ['./game-js.component.scss']
})
export class GameJsComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    console.log('after view init')
    $.getScript('assets/word-find.js');
  }
}
