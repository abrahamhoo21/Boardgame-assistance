import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TextScannerComponent } from './text-scanner/text-scanner.component';
import { ImageAdjustmentComponent } from './image-adjustment/image-adjustment.component';
import { ImageCropperComponent} from 'ngx-image-cropper';
import { TextExtractionComponent } from './text-extraction/text-extraction.component';


@NgModule({
  declarations: [
    AppComponent,
    TextScannerComponent,
    ImageAdjustmentComponent,
    TextExtractionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    WebcamModule,
    ImageCropperComponent
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
