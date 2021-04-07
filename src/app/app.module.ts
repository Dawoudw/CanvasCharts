import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialsModule } from './modules/materials/materials.module';
import { InfrastructureDashboardReportsComponent } from './components/infrastructure-dashboard-reports/infrastructure-dashboard-reports.component';
import { IntelliStatsComponent } from './components/intelli-stats/intelli-stats.component';
import { QuickMemoryOverviewComponent } from './components/quick-memory-overview/quick-memory-overview.component';
import { DiskIOComponent } from './components/quick-memory-overview/disk-io/disk-io.component';
import { MemoryPagesInOutComponent } from './components/quick-memory-overview/memory-pages-in-out/memory-pages-in-out.component';
import { RAMMemoryComponent } from './components/quick-memory-overview/rammemory/rammemory.component';
import { DiskSpaceUsedComponent } from './components/quick-memory-overview/disk-space-used/disk-space-used.component';

@NgModule({
  declarations: [
    AppComponent,
    InfrastructureDashboardReportsComponent,
    IntelliStatsComponent,
    QuickMemoryOverviewComponent,
    DiskIOComponent,
    MemoryPagesInOutComponent,
    RAMMemoryComponent,
    DiskSpaceUsedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
