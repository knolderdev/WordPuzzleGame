import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LetterGrid, WordPacker} from "../../../assets/word-packer";
import {selectWordIndexArrayModel} from "../../Constants/game.model";

@Component({
  selector: 'app-canvas-game',
  templateUrl: './canvas-game.component.html',
  styleUrls: ['./canvas-game.component.scss']
})
export class CanvasGameComponent implements OnInit, AfterViewInit {
  // Grid Generation related variables
  letterGrid: LetterGrid | null;
  inputWords: string;
  leftClicked = false;
  rowAllowed = false;
  colAllowed = false;
  selectedWordsArray: any = [];
  currentX !: number;
  currentY !: number;
  cellHw = 40;
  canvasWidth = 400;
  canvasHeight = 400;
  xAlign = 10;
  yAlign = 24;
  selectedIndexArrayObj: selectWordIndexArrayModel[] = [
    {
      row: 0,
      col: []
    },
    {
      row: 1,
      col: []
    },
    {
      row: 2,
      col: []
    },
    {
      row: 3,
      col: []
    },
    {
      row: 4,
      col: []
    },
    {
      row: 5,
      col: []
    },
    {
      row: 6,
      col: []
    },
    {
      row: 7,
      col: []
    },
    {
      row: 8,
      col: []
    },
    {
      row: 9,
      col: []
    }
  ];
  tempselectedIndexArrayObj: selectWordIndexArrayModel[] = [
    {
      row: 0,
      col: []
    },
    {
      row: 1,
      col: []
    },
    {
      row: 2,
      col: []
    },
    {
      row: 3,
      col: []
    },
    {
      row: 4,
      col: []
    },
    {
      row: 5,
      col: []
    },
    {
      row: 6,
      col: []
    },
    {
      row: 7,
      col: []
    },
    {
      row: 8,
      col: []
    },
    {
      row: 9,
      col: []
    }
  ];
  allowedRowArrayIndexArray: any = [];
  allowedColArrayIndexArray: any = [];
  wordsToSearchArray: any = [];
  foundWordArray: any = [];
  row !: number;
  words = [
    "Arguments", "Array", "Async", "Await", "Bubble", "Capture", "Catch",
    "Class", "Closure", "Const", "Continue", "Debugger", "Event", "tiktikboom",
  ];

  // Canvas related variables
  @ViewChild('canvas', {static: true})
  canvas!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D | null;

  constructor() {
    this.letterGrid = null;
    this.inputWords = this.getInitialInput();
    this.generateSearch(this.inputWords);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (this.ctx != null) {
      this.ctx.font = '18px serif';
      this.horizontalGridLines();
      this.verticalGridLines();
      this.fillTextFromLetterGrid();
    }
  }

  // Function to make horizontal lines in grid
  horizontalGridLines() {
    for (let i = 0; i <= 8; i++) {
      if (this.ctx != null) {
        this.ctx?.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "black";
        this.ctx.moveTo(0, this.cellHw + this.cellHw * i);
        this.ctx.lineTo(this.canvasWidth, this.cellHw + this.cellHw * i);
        this.ctx.stroke();
      }
    }
  }

  //Function to make vertical lines in grid
  verticalGridLines() {
    for (let i = 0; i <= 8; i++) {
      if (this.ctx != null) {
        this.ctx?.beginPath();
        this.ctx.lineWidth = i === 9 ? 0 : 2;
        this.ctx.strokeStyle = "black";
        this.ctx.moveTo(this.cellHw + this.cellHw * i, 0);
        this.ctx.lineTo(this.cellHw + this.cellHw * i, this.canvasHeight);
        this.ctx.stroke();
      }
    }
  }

  fillTextFromLetterGrid() {
    this.letterGrid?.forEach((gridEl, indexgridEl) => {
      gridEl.forEach((letter, index) => {
        if (this.ctx != null) {
          this.ctx?.fillText(letter, this.xAlign + index * this.cellHw, this.yAlign + indexgridEl * this.cellHw);
        }
      })
    })
  }

  getMousePosition(canvas: any, event: any) {
    let rect = canvas.getBoundingClientRect();
    let x = Math.ceil((event.clientX - rect.left) / this.cellHw) - 1;
    let y = Math.ceil((event.clientY - rect.top) / this.cellHw) - 1;
    return [x, y];
  }

  getSelectedLetter(event: any) {
    let canvasElem = document.querySelector("canvas");
    let tempArray = this.getMousePosition(canvasElem, event);
    if (this.letterGrid) {
      return this.letterGrid[tempArray[1]][tempArray[0]];
    }
    return ''
  }

  selection(event: any) {
    if (this.leftClicked) {
      let canvasElem = document.querySelector("canvas");
      let newCurrentX = this.getMousePosition(canvasElem, event)[1];
      let newCurrentY = this.getMousePosition(canvasElem, event)[0];
      let newRowAllowed = newCurrentX != this.currentX;
      let newColAllowed = newCurrentY != this.currentY;
      if (newCurrentY != this.currentY || newCurrentX != this.currentX) {
        this.selectedWordsArray.push(this.getSelectedLetter(event));
        this.currentX = newCurrentX;
        this.currentY = newCurrentY;
        this.tempselectedIndexArrayObj.forEach((obj) => {
          if (obj.row === this.currentX) {
            if (!obj.col.includes(this.currentY)) {
              obj.col.push(this.currentY);
            }
          }
        });
        this.draw(canvasElem, event);
      }
      console.log('this.currentX ===>', this.currentX);
      console.log('this.currentY ===>', this.currentY);
    }
  }

  ifRowAllowed(x: number){
    return x === this.currentX;
  }

  ifColAllowed( y: number){
    return y === this.currentY
  }

  mouseDown(event: any) {
    this.rowAllowed = true;
    this.colAllowed = true;
    this.ctx?.save();
    this.selectedWordsArray = [];
    this.leftClicked = true;
    this.selectedWordsArray.push(this.getSelectedLetter(event));
    let canvasElem = document.querySelector("canvas");
    this.currentX = this.getMousePosition(canvasElem, event)[1];
    this.currentY = this.getMousePosition(canvasElem, event)[0];
    // console.log('this.currentX ===>', this.currentX);
    // console.log('this.currentY ===>', this.currentY);
    this.tempselectedIndexArrayObj.forEach((obj) => {
      if (obj.row === this.currentX) {
        if (!obj.col.includes(this.currentY)) {
          obj.col.push(this.currentY);
        }
      }
    });
    this.draw(canvasElem, event);
    this.allowedColArrayIndexArray = this.createArrayRange(this.currentX);
    this.allowedRowArrayIndexArray = this.createArrayRange(this.currentY);
    console.log('this.allowedColArrayIndexArray', this.allowedColArrayIndexArray);
    console.log('this.allowedRowArrayIndexArray', this.allowedRowArrayIndexArray);
  }

  createArrayRange(start: number) {
    let output = [];
    for (let i = start; i < 10; i += 1) {
      output.push(i);
    }
    return output;
  }

  mouseUp(event: any) {
    // console.log('this.tempselectedIndexArrayObj', this.tempselectedIndexArrayObj);
    // console.log('this.selectedIndexArrayObj', this.selectedIndexArrayObj);
    // console.log('this.selectedWordsArray.join(\'\').toUpperCase() ===>', this.selectedWordsArray.join('').toUpperCase())
    this.leftClicked = false;
    this.words.forEach((word) => {
      if (word.toUpperCase() === this.selectedWordsArray.join('')) {
        if (!this.foundWordArray.includes(this.selectedWordsArray.join('').toUpperCase())) {
          this.foundWordArray.push(this.selectedWordsArray.join('').toUpperCase());
        }
      }
    });
    if (this.foundWordArray.includes(this.selectedWordsArray.join('').toUpperCase())) {
      let canvasElem = document.querySelector("canvas");
      this.currentX = this.getMousePosition(canvasElem, event)[1];
      this.currentY = this.getMousePosition(canvasElem, event)[0];
      let found = false;
      this.selectedIndexArrayObj.forEach((obj) => {
        if (obj.row === this.currentX) {
          found = true;
          this.tempselectedIndexArrayObj[this.currentX].col.forEach((obj1) => {
            if (!obj.col.includes(obj1)) {
              obj.col.push(obj1);
            }
          })
        }
      });
      if (!found) {
        this.selectedIndexArrayObj.push({
          row: this.tempselectedIndexArrayObj[0].row,
          col: this.tempselectedIndexArrayObj[0].col
        })
      }
    }
    else{
      console.log('going in replacementLetterBywhite background');
      this.selectedIndexArrayObj.sort(function (a, b) {
        return a.row - b.row;
      });
      this.replacementOfLetterIfNotFound();
    }
    this.setInitialTempSelectedArrayObj();
  }

  setInitialTempSelectedArrayObj(){
    this.tempselectedIndexArrayObj = [
      {
        row: 0,
        col: []
      },
      {
        row: 1,
        col: []
      },
      {
        row: 2,
        col: []
      },
      {
        row: 3,
        col: []
      },
      {
        row: 4,
        col: []
      },
      {
        row: 5,
        col: []
      },
      {
        row: 6,
        col: []
      },
    ];
  }

  // Grid Generation related functions
  generateSearch(rawValue: string): void {
    this.inputWords = rawValue.trim();
    let words = this.inputWords.split(/[\r\n]/g);
    let wordPacker = WordPacker.createWordPacker(
      words,
      10, // Width of the letter-grid in characters.
      this.xAlign // Height of the letter-grid in characters.
    );
    this.letterGrid = wordPacker.getLetterGrid();
    this.logWords(
      wordPacker.getWords(),
      wordPacker.getSkippedWords()
    );
  }

  getInitialInput(): string {
    return (this.words.join("\n"));
  }

  logWords(words: string[], skippedWords: string[]): void {
    if (words.length) {
      words.forEach((word) => {
        this.wordsToSearchArray.push(word.toUpperCase())
      });
    }
  }

  //  Color filling functions
  draw(canvas: any, event?: any) {
    let rect = canvas.getBoundingClientRect();
    let x = Math.ceil((event.clientX - rect.left) / this.cellHw) - 1;
    let y = Math.ceil((event.clientY - rect.top) / this.cellHw) - 1;
    let currentText = this.getSelectedLetter(event)?.toString();
    if (this.ctx) {
      this.ctx.fillStyle = 'yellow';
      this.ctx.fillRect(x*this.cellHw, y*this.cellHw, this.cellHw, this.cellHw);
      this.ctx.closePath();
      this.ctx.fillStyle = 'black'
      this.ctx.fillText(currentText, x*this.cellHw + this.xAlign, y*this.cellHw + this.yAlign)
    }
    this.horizontalGridLines();
    this.verticalGridLines();
  }

  replacementOfLetterIfNotFound(){
    console.log('this.tempselectedIndexArrayObj', this.tempselectedIndexArrayObj);
    console.log('this.selectedIndexArrayObj', this.selectedIndexArrayObj);
    this.tempselectedIndexArrayObj.forEach((obj) => {
      if (obj.col.length != 0) {
        console.log('obj.row ====>', obj.row);
        console.log('obj.col ====>', obj.col);
        obj.col.forEach((ele, index) => {
          if(!this.selectedIndexArrayObj[obj.row].col.includes(ele)){
            if (this.ctx) {
              this.ctx.fillStyle = 'white';
              this.ctx.fillRect( ele* this.cellHw, obj.row * this.cellHw, this.cellHw, this.cellHw);
              this.ctx.closePath();
              this.ctx.fillStyle = 'black';
              if (this.letterGrid) {
                this.ctx.fillText(this.letterGrid[obj.row][ele], ele * this.cellHw + this.xAlign, obj.row * this.cellHw + this.yAlign);
              }
            }
            this.horizontalGridLines();
            this.verticalGridLines();
          }
        })
      }
    });
  }
}
