import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IProduct } from './product';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.css'],
})
export class SecureComponent implements OnInit {
  public products = [] as any;
  public selectedProduct = <IProduct>{};
  public modalTitle = '';
  public btnTitle = '';
  public name = new FormControl('', Validators.required);
  public description = new FormControl('', Validators.required);
  public price = new FormControl('', Validators.required);
  public showError = false;
  modalRef?: BsModalRef;

  user: any;
  constructor(
    private service: ProductService,
    private modalService: BsModalService,
    private http: HttpClient,
    private router: Router
  ) {}

  openModal(template: TemplateRef<any>, product?: IProduct) {
    if (product) {
      this.modalTitle = 'Edit Product';
      this.btnTitle = 'Update';
      this.selectedProduct = product;
      this.name.setValue(product.name);
      this.description.setValue(product.description);
      this.price.setValue(product.price);
    } else {
      this.modalTitle = 'Add Product';
      this.btnTitle = 'Save';
      this.reset();
    }
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.getList();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    this.http.get('http://localhost:8000/user', { headers: headers }).subscribe(
      (result) => (this.user = result),
      (err) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      }
    );
  }

  getList() {
    this.service.list().subscribe((response) => (this.products = response));
  }

  delete(product: IProduct) {
    this.service.delete(product).subscribe((response) => this.getList());
  }

  save() {
    if (!this.name.value || !this.description.value || !this.price.value) {
      this.showError = true;
      return;
    }

    this.selectedProduct.name = this.name.value;
    this.selectedProduct.description = this.description.value;
    this.selectedProduct.price = this.price.value;

    if (this.btnTitle == 'Update') {
      this.service.update(this.selectedProduct).subscribe((response) => {
        this.getList();
        this.reset();
        this.showError = false;
        this.modalRef?.hide();
      });
    } else {
      this.service.add(this.selectedProduct).subscribe((response) => {
        this.getList();
        this.reset();
        this.showError = false;
        this.modalRef?.hide();
      });
    }
  }

  reset() {
    this.name.reset();
    this.description.reset();
    this.price.reset();
  }
}
