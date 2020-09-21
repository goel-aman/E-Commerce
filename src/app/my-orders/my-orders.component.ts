import { switchMap } from 'rxjs/operators';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as jsPDF from 'jspdf';
import {MatTableModule} from '@angular/material/table';

//declare var jsPDF: any;

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  orders$;
  ordertodisplay;
  editState: boolean = false;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor(private authService:AuthService,
    private orderService: OrderService) { 
      this.orders$ = this.authService.user$.pipe(switchMap(u => this.orderService.getOrdersByUser(u.uid)));
    }

    displaydata(event,order){
      this.ordertodisplay = order;
      this.editState = true;
    }
  
    generateitemarray(x){
      console.log(x);
      let arr= [];
      for(let productId in x.items){
        arr.push({product: x.items[productId].product,quantity: x.items[productId].quantity});
      }
      console.log(arr);
      return arr;
     // console.log(x);
    }
  
    clearState(){
      this.editState = false;
      this.ordertodisplay = null;
    }

    htmlToPdf(y,order) {
      var d = new Date(order.datePlaced);
      let k = d.getDate();
      let m = d.getHours();
      let m1 = d.getMinutes();
      let m2 = d.getSeconds();
      let mm = d.getMonth();
      let yy = d.getFullYear();
      const doc = new jsPDF('p', 'mm','a4');
     doc.setFontType("bold");
      doc.setFontSize(30);
  
      doc.addFont('ArialMS', 'Arial', 'normal');
      doc.setFont('Arial');
      doc.text(10,20,'Bhola Ram And Sons');
      doc.setFontSize(12);
      doc.text(10,30, "Shipping Details    " + "                                      Date: " + `${k}`+","+`${mm+1}`+","+`${yy}` + "                                      Time: " + `${m}`+":"+`${m1}`+":"+`${m2}`);
      
      doc.setFontType("normal");
      doc.setFontSize(10);
       
      doc.text(10,35,`${order.shipping.name}`);
      doc.text(10,40,`${order.shipping.addressLine1}`);
      doc.setFontSize(25);
      doc.setFontType("bold");
      doc.text(90,50,"Invoice");
      doc.setFontSize(14);
      doc.text(10,60,"Title");
      doc.text(80,60,"Category");
      doc.text(110,60,"Price");
      doc.text(140,60,"Quantity");
      doc.text(180,60,"Amount");
      doc.setFontType("normal");
      doc.setFontSize(10);
     
      var count = 3;
      let finalsum = 0;
      for(let x of y){
        count++;
        doc.text(10,30+ count*10,x.product.title);
        doc.text(80,30+ count*10,x.product.category);
        doc.text(110,30+count*10,`${x.product.price}`);
        doc.text(130,30+ count*10,"X");
        doc.text(150,30+ count*10,`${x.quantity}`);
        doc.text(180,30+ count*10,`${x.product.price * x.quantity}`);
        finalsum += x.product.price * x.quantity;
      }
      
      doc.text(10,30+(count+1)*10,"--------------------------------------------------------------------------------------------------------------------------------------------------------------");
      doc.setFontType("bold");
      doc.setFontSize(14);

      doc.text(10,30+(count+2)*10,"Total Amount ");
      doc.text(180,30+(count+2)*10,`${finalsum}`);
      // var count = 1;
      // for(var i=1;i<15;i++){
      //   count++;
      //   if(count % 9 == 0){
      //     count = 1;
      //     doc.addPage();
      //   }
      //   doc.text(20,30+ count*20,this.arr[i-1].name);
      //   doc.text(80,30+ count*20,this.arr[i-1].product);
      // }
      // for(var i=0;i<2;i++){
      // doc.fromHTML(
      //     this.arr[i].name + "  " + this.arr[i].product
      //     , i, i*10);
      // }
        // doc.fromHTML(this.arr.product,10,10)
        doc.autoPrint();
        doc.save('invoice.pdf');
        
     
  }
  ngOnInit(): void {

  }

}
