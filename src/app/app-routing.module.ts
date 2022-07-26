import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WrapperComponent} from "./components/wrapper/wrapper.component";
import {GameJsComponent} from "./components/game-js/game-js.component";
import {CanvasGameComponent} from "./components/canvas-game/canvas-game.component";

const routes: Routes = [
  {
    path: '',
    component: WrapperComponent
  },
  {
    path: 'test',
    component: GameJsComponent
  },
  {
    path: 'canvas',
    component: CanvasGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
