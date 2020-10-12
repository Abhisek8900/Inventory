import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HTMLInputEvent, IListitem } from '../mylistitem.interface';

@Component({
  selector: 'app-additem',
  templateUrl: './additem.component.html',
  styleUrls: ['./additem.component.scss']
})
export class AdditemComponent implements OnInit {
  additem: IListitem[] = [];
  name: string;
  price: string;
  filename;
  description: string;
  type: string;
  id;

  constructor(private router: Router, private route: ActivatedRoute,) { }

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.type = params["type"];
      this.id = params["id"];
    });

    if (this.type == "details") {
      let itemdetails = JSON.parse(localStorage.getItem("Item"));
      itemdetails = itemdetails != null && itemdetails.length ? itemdetails.find(a => a.id == this.id) : null;
      this.name = itemdetails.name;
      this.price = itemdetails.price;
      this.description = itemdetails.description,
        this.filename = itemdetails.image;
    }
  }

  fileEvent(fileInput: HTMLInputEvent) {
    var file = fileInput.target.files[0];
    var reader = new FileReader()
    reader.onload = function (base64) {
      localStorage["file"] = JSON.stringify(base64.target.result);
      //localStorage["file"] = JSON.stringify(base64);
    }
    reader.readAsDataURL(file);
  }

  submititem() {
    if (this.type == "details") {
      this.router.navigate(["/mylistitem"]);
    }
    else {
      this.filename = JSON.parse(localStorage["file"]);
      let itemid = JSON.parse(localStorage.getItem("Item"));
      let id = 0;
      if (itemid != null && itemid.length) {
        id = itemid[itemid.length - 1].id + 1;
      }
      this.additem.push({
        id: id,
        name: this.name,
        price: this.price,
        description: this.description,
        image: this.filename
      });
      if (this.additem.length) {
        if (localStorage.getItem("Item")) {
          let item = JSON.parse(localStorage.getItem("Item"));
          if (item.length) {
            this.additem.forEach(data => {
              item.push(data);
            });
            localStorage.setItem("Item", JSON.stringify(item));
            this.router.navigate(["/mylistitem"]);
          }
          else {
            localStorage.setItem("Item", JSON.stringify(this.additem));
            this.router.navigate(["/mylistitem"]);
          }
        }
        else {
          localStorage.setItem("Item", JSON.stringify(this.additem));
          this.router.navigate(["/mylistitem"]);
        }
      }
    }



  }
}
