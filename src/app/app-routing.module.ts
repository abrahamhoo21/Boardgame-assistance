import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextScannerComponent } from './text-scanner/text-scanner.component';
import { ImageAdjustmentComponent } from './image-adjustment/image-adjustment.component';

const routes: Routes = [
  { path: 'text-scanner', component: TextScannerComponent },
  { path: 'image-adjustment', component: ImageAdjustmentComponent},
  { path: '', redirectTo: '/text-scanner', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
