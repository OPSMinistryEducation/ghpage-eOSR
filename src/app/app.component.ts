import { Component, ViewChild } from '@angular/core';
import { CanvasWhiteboardUpdate, CanvasWhiteboardComponent } from "ng2-canvas-whiteboard";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;
  generatedString: string;

  sendBatchUpdates(updates: CanvasWhiteboardUpdate[]) {
    this.generatedString = this.canvasWhiteboard.generateCanvasDataUrl("image/jpeg", 0.3);
  }
}
