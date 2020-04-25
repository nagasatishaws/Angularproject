import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnLoadingComponent } from './btn-loading/btn-loading.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutsModule } from '../project-layouts/layouts.module';
const components = [BtnLoadingComponent];
@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, NgbModule, LayoutsModule]
})
export class CommoncomponentsModule {}
