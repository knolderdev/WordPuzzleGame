import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { GameJsComponent } from './components/game-js/game-js.component';
import { CanvasGameComponent } from './components/canvas-game/canvas-game.component';

@NgModule({
  declarations: [
    AppComponent,
    WrapperComponent,
    GameJsComponent,
    CanvasGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
