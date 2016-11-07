import {NgModule} from '@angular/core';
import {UpgradeAdapter} from '@angular/upgrade';

@NgModule({})
class WorkaroundModule {}

// @see: https://github.com/angular/angular/issues/11069
// @see: http://stackoverflow.com/questions/39911877/how-to-use-angular-2s-upgradeadapter-upgradeng1component
export const upgradeAdapter = new UpgradeAdapter(WorkaroundModule);
