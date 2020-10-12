import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  fileEvent(fileInput: HTMLInputEvent) {
    var file = fileInput.target.files[0];
    var reader = new FileReader()
    reader.onload = function(base64) {
      localStorage["file"] = JSON.stringify(base64.target.result);
      //localStorage["file"] = JSON.stringify(base64);
    }
    reader.readAsDataURL(file);
}

  submititem() {
    this.filename=JSON.parse(localStorage["file"]);
    this.additem.push({
      name: this.name,
      price: this.price,
      description: this.description,
      image: this.filename
    });
    if(this.additem.length){
      if(localStorage.getItem("Item")){
        let item=JSON.parse(localStorage.getItem("Item"));
        if(item.length){
         this.additem.forEach(data=>{
           item.push(data);
         });
        localStorage.setItem("Item",JSON.stringify(item));
        this.router.navigate(["/mylistitem"]);
        }
        else{
            localStorage.setItem("Item",JSON.stringify(this.additem));
            this.router.navigate(["/mylistitem"]);
        }
      }
      else {
        localStorage.setItem("Item",JSON.stringify(this.additem));
        this.router.navigate(["/mylistitem"]);
      }
    }
   

  }
}
