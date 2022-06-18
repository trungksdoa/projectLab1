import { HttpErrorResponse } from '@angular/common/http'
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { timeout } from 'rxjs'
import { Category } from 'src/app/api/category/category'
import { CategoryService } from 'src/app/api/category/category.service'
import { Product } from 'src/app/api/product/product'
import { ProductService } from 'src/app/api/product/product.service'
import { SharedService } from 'src/app/shared.service'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  //Old
  categorys: Category[]
  uploadedFiles: File
  failed = false
  isLoading = false
  imageDataUrl: any = undefined
  formType: string = 'add'
  // fileSelected: File
  productContent: Product
  style = {
    'border-radius': '5px',
    height: '327px',
    width: '100%',
    'object-fit': 'cover',
    background: 'rgb(217, 156, 0,0.34)',
    border: '1px solid white'
  }
  showError: any
  @ViewChild('inputImage', { static: false }) inputImage
  constructor (
    private productService: ProductService,
    private categoryService: CategoryService,
    private sharedService: SharedService,
    private dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: Product; type: string }
  ) {}

  urlToObject = async () => {
    if (this.uploadedFiles) {
      return this.uploadedFiles
    } else {
      const response = await fetch(this.imageDataUrl)
      // here image is url/location of image
      const blob = await response.blob()
      const file = new File([blob], 'image.jpg', { type: blob.type })
      return file
    }
  }

  ngOnInit (): void {
    this.formType = this.data.type
    this.productContent = this.data.data

    this.imageDataUrl =
      this.productContent.imageurl.length === 0
        ? 'https://previews.123rf.com/images/bonumopus/bonumopus1603/bonumopus160300089/53156323-empty-transparent-background-with-gradient-opacity-.jpg'
        : 'http://localhost:8081/image/' + this.productContent.imageurl

    this.getAllCategory()
  }

  getAllCategory (): void {
    this.categoryService.getAllCategory().subscribe(
      (response: Category[]) => {
        this.categorys = response
        console.log(this.categorys)
      },
      (error: HttpErrorResponse) => {
        alert(error.message)
      }
    )
  }

  onUploadImageButtonClick () {
    this.inputImage.nativeElement.click()
  }

  onFileChange () {
    const target = this.inputImage.nativeElement
    if (target.files && target.files.length) {
      const [file] = target.files
      this.uploadedFiles = file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = _event => {
        this.imageDataUrl = reader.result
      }
    }
  }

  formValidate (value: Product) {
    const error: any = {}

    if (
      value.name.trim().length === 0 ||
      value.name === undefined ||
      value.name === null
    ) {
      error.name = 'Tên không được để trống'
    } else if (
      value.description.trim().length === 0 ||
      value.description === undefined ||
      value.description === null
    ) {
      error.description = 'Mô tả không được để trống'
    } else if (
      value.price === undefined ||
      value.price === 0 ||
      value.price === null
    ) {
      error.price = 'Giá không được để trống'
    } else if (value.catagory === undefined) {
      error.catagory = 'Danh mục không được để trống'
    }

    return error
  }

  clearForm () {
    this.productContent = {
      id: 0,
      name: '',
      description: '',
      imageurl: '',
      price: 0,
      createdAt: undefined,
      updatedAt: undefined,
      catagory: {
        id: 0,
        name: '',
        createdAt: undefined,
        updatedAt: undefined
      }
    }
  }

  onSubmit = () => {
    console.log(
      Object.keys(this.formValidate(this.productContent)).length === 0
    )
    if (Object.keys(this.formValidate(this.productContent)).length === 0) {
      this.isLoading = true
      this.failed = false
      const formData: any = new FormData()

      this.urlToObject().then(file => {
        formData.append('product', JSON.stringify(this.productContent))
        formData.append('image', file)
        if (this.formType === 'add') {
          this.productService.createProductWithFileUpload(formData).subscribe(
            (response: Product) => {
              console.log(response)

              setTimeout(() => {
                this.sharedService.submitFormProduct(response)
                this.dialogRef.close()
                this.clearForm()
              }, 100)

            },
            (error: HttpErrorResponse) => {
              alert(error.message)
            }
          )
        } else {
          this.productService.updateProductWithFileUpload(formData).subscribe(
            (response: Product) => {
              console.log(response)
              setTimeout(() => {
                this.sharedService.submitFormProduct(response)
                this.dialogRef.close()
              }, 500)
            },
            (error: HttpErrorResponse) => {
              alert(error.message)
            }
          )
        }
      })
    } else {
      this.showError = this.formValidate(this.productContent)
    }
  }
}
