import { Component, OnInit } from '@angular/core';
import { Product } from '../../../types/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { formatDateForInput } from '../../../utils/format-date';
import { BackButtonDirective } from '../../directives/back-button.directive';

@Component({
  selector: 'product-edit',
  standalone: true,
  imports: [ReactiveFormsModule, BackButtonDirective],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class ProductEditComponent implements OnInit {
  productId: number | null = null;
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.productForm = this.fb.group({
      codProd: [{ value: '', disabled: true }, Validators.required],
      nomProd: ['', Validators.required],
      descProd: [''],
      codCat: ['', Validators.required],
      preProd: [0, [Validators.required, Validators.min(0)]],
      stockProd: [0, [Validators.required, Validators.min(0)]],
      estProd: [false], // Assume status is a boolean
      fecProd: [{ value: new Date(), disabled: true }, Validators.required],
    });
  }

  public ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['id'];
    this.getData();
  }

  public getData(): void {
    if (!this.productId) return;
    this.productService.getProductById(this.productId).subscribe({
      next: (res) =>
        this.productForm.patchValue({
          ...(res as Product),
          fecProd: formatDateForInput((res as Product).fecProd),
        }),
      error: (err) => {
        this.router.navigate(['/product']);
        this.toastr.error(err.error.message);
      },
    });
  }

  public onSubmit(): void {
    if (!this.productId) return;
    if (this.productForm.valid) {
      this.productService
        .updateProduct(this.productId, this.productForm.value)
        .subscribe({
          next: (res) => {
            const response = res as { message: string };
            this.toastr.success(response.message);
            this.router.navigate(['/product']);
          },
          error: (err) => this.toastr.error(err.error.message),
        });
    } else {
      this.toastr.error('Please fill out the form correctly.');
    }
  }
}
