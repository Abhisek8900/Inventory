import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { IListitem } from './mylistitem.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-mylistitem',
  templateUrl: './mylistitem.component.html',
  styleUrls: ['./mylistitem.component.scss']
})
export class MylistitemComponent implements OnInit {
  displayedColumns = ['name', 'price', 'image', 'description', 'actions'];
  listdata: IListitem[] = [];
  itemdata: IListitem[] = [];
  constructor(private router: Router,private domSanitizer: DomSanitizer) { }
  @ViewChild(MatTable) table: MatTable<any>;
  ngOnInit() {
    this.getlistdata();
  }

  deleterowitem(element) {
    let itemid=element.id;
    this.listdata=this.listdata.filter(a=>a.id!==itemid);
    localStorage.setItem("Item", JSON.stringify(this.listdata));//after deleteing a specific row from datasource we are updating local storage  also
    this.getlistdata();
  }

  getlistdata() {
    if (localStorage.getItem("Item")) {
      this.itemdata = JSON.parse(localStorage.getItem("Item"));
      if (this.itemdata.length) {
        this.itemdata.forEach(result => {
          this.listdata.push(result);
        })
      }
    }
  }

  getphoto(element){
   var base64 = localStorage["file"];
   var base64Parts = base64.split(",");
   var fileFormat = base64Parts[0].split(";")[1];
   var filename=base64Parts[0].split(";")[0];
   var fileContent = base64Parts[1];
   var file = new File([fileContent], filename, {type: fileFormat});
   element.image=this.domSanitizer.bypassSecurityTrustUrl(filename);
   return element.image;
  }
  addnewitem() {
    this.router.navigate(["/additem"]);
  }

  getitemdetails(element){
    this.router.navigate(["/additem"], {
      queryParams: {type:"details",id:element.id}
    });
  }
}
