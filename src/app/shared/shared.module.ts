import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPanelComponent } from './components/menu-panel/menu-panel.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductContainerComponent } from './components/product-container/product-container.component';

@NgModule({
  declarations: [MenuPanelComponent, ProductContainerComponent],
  imports: [CommonModule, MatTabsModule],
  exports: [MenuPanelComponent],
})
export class SharedModule {}
