import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebcamModule } from 'ngx-webcam';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SafePipe } from '../safe.pipe';
import { TextScannerComponent } from './text-scanner/text-scanner.component';
import { ImageAdjustmentComponent } from './image-adjustment/image-adjustment.component';
import { ImageCropperComponent} from 'ngx-image-cropper';
import { TextExtractionComponent } from './text-extraction/text-extraction.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ScorekeepingComponent } from './scorekeeping/scorekeeping.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    TextScannerComponent,
    ImageAdjustmentComponent,
    TextExtractionComponent,
    SafePipe,
    ScorekeepingComponent,
    ChatbotComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    WebcamModule,
    ImageCropperComponent
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
