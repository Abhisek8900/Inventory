import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MylistitemComponent } from './mylistitem/mylistitem.component';
import {AdditemComponent} from './mylistitem/additem/additem.component'
const routes: Routes = [
  { path: "", component: MylistitemComponent, pathMatch: "full" },
  { path: "mylistitem", component: MylistitemComponent },
  { path: "additem", component: AdditemComponent },
  { path: "**", redirectTo: "mylistitem" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
