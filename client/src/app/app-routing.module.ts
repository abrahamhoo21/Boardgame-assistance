import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextScannerComponent } from './text-scanner/text-scanner.component';
import { ImageAdjustmentComponent } from './image-adjustment/image-adjustment.component';
import { TextExtractionComponent } from './text-extraction/text-extraction.component'; 
import { ScorekeepingComponent } from './scorekeeping/scorekeeping.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

const routes: Routes = [
  { path: 'text-scanner', component: TextScannerComponent,  data: { title: 'Text Scanner' } },
  { path: 'image-adjustment', component: ImageAdjustmentComponent, data: { title: 'Scorekeeping' }},
  { path: 'text-extraction', component: TextExtractionComponent, data: { title: 'Text Extraction' } },
  { path: 'scorekeeping', component: ScorekeepingComponent, data: { title: 'Scrokeeping' } },
  { path: 'chatbot', component: ChatbotComponent, data: { title: 'Chatbot' } },
  { path: '', redirectTo: '/text-scanner', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
