import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuPanelComponent } from './components/menu-panel/menu-panel.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { ProductContainerComponent } from './components/product-container/product-container.component';
import { DisconnectedAlertComponent } from './components/disconnected-alert/disconnected-alert.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    MenuPanelComponent,
    ProductContainerComponent,
    DisconnectedAlertComponent,
    HeaderComponent,
  ],
  imports: [CommonModule, MatTabsModule, MatButtonModule, RouterModule],
  exports: [MenuPanelComponent, DisconnectedAlertComponent, HeaderComponent],
})
export class SharedModule {}
