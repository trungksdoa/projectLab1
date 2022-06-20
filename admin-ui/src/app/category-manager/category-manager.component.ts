import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../api/category/category';
import { CategoryService } from '../api/category/category.service';

@Component({
  selector: 'app-category-manager',
  templateUrl: './category-manager.component.html',
  styleUrls: ['./category-manager.component.css']
})
export class CategoryManagerComponent implements OnInit {

  
  public categorys: Category[];
  public editCate: Category;
  public deleteCate: Category;
  constructor(private categoryService: CategoryService) {

  }

  ngOnInit() {
    this.getAllCategory();
  }
  public getAllCategory(): void {
    this.categoryService.getAllCategory().subscribe(
      (response: Category[]) => {

        this.categorys = response;
        console.log(this.categorys);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onAddCategory(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.categoryService.addCategory(addForm.value).subscribe(
      (response: Category) => {
        console.log(response);
        this.getAllCategory();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateCategory(cate: Category): void {

    this.categoryService.updateCategory(cate).subscribe(
      (response: Category) => {
        console.log(response);
        this.getAllCategory();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCategory(cateid: number): void {
    this.categoryService.deleteCategory(cateid).subscribe(
      (response: void) => {
        console.log(response);
        this.getAllCategory();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchCategory(key: string): void {
    console.log(key);
    const results: Category[] = [];
    for (const cate of this.categorys) {
      if (cate.name.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(cate);
      }
    }
    this.categorys = results;
    if (results.length === 0 || !key) {
      this.getAllCategory();
    }
  }

  public onOpenModal(cate: Category, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editCate = cate;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
      this.deleteCate = cate;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container.appendChild(button);
    button.click();
  }

}
