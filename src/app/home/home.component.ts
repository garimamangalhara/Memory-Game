import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { THIS_EXPR } from '../../../node_modules/@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public blockList = [];
  public firstCircle: boolean = true
  public hideAll: boolean = false
  public circlesFound = []
  public stage: any = 1;
  public score: any = 0;
  constructor() {
    for (var i = 1; i <= 36; i++) {
      this.blockList[i - 1] = { index: i, circleFlag: false }
    }
    this.setCircleFlags(5)
  }

  ngOnInit() {
    // this.getPostsData()
    // setTimeout(() => this.getTopPosts(),1000)
  }
  generateRandom(n) {
    let randomNums = []
    while (randomNums.length < n) {
      let num = Math.floor((Math.random() * 36) + 1);
      if (randomNums.indexOf(num) == -1) {
        randomNums.push(num)
      }
    }
    console.log("random nums:", randomNums)
    return randomNums;
  }
  setCircleFlags(n) {
    let randomNums = this.generateRandom(n)
    for (var i = 0; i < 36; i++) {
      if (randomNums.indexOf(this.blockList[i].index) !== -1) {
        this.blockList[i].circleFlag = true
      }
    }
  }

  restartGame() {
    this.score = 0;
    this.firstCircle = true;
    this.hideAll = false;
    this.stage = 1;
    this.circlesFound = []
    for (var i = 1; i <= 36; i++) {
      this.blockList[i - 1] = { index: i, circleFlag: false }
    }
    this.setCircleFlags(5)
  }
  onClickCircle(block) {
    if (block.circleFlag) {
      if (this.firstCircle) {
        this.hideAll = true
        this.firstCircle = false
        this.circlesFound.push(block.index)
      }
      else {
        if (this.circlesFound.indexOf(block.index) == -1) {
          this.circlesFound.push(block.index)
          console.log(this.circlesFound)
          if (this.circlesFound.length == (this.stage + 4)) {
            alert("Won")
            this.increaseLevel();
          }

        }
        else {
          console.log("clicked on same block")
        }
      }
    }
    else {
      alert("Game Over");
      this.restartGame()
    }

  }
  increaseLevel() {
    this.score = this.score + 100 * this.stage;
    this.stage++;
    this.firstCircle = true;
    this.circlesFound = []
    this.hideAll = false;
    for (var i = 1; i <= 36; i++) {
      this.blockList[i - 1] = { index: i, circleFlag: false }
    }
    if (this.stage == 33) {
      this.stage = 1
    }
    this.setCircleFlags(this.stage + 4)
  }

}
