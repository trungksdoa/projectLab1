import { HttpEventType, HttpResponse } from "@angular/common/http"
import { Component, OnInit, OnChanges, ViewChild } from "@angular/core"
import { BannerService } from "src/app/api/service/banner_service"
import { Banner } from "src/app/model/banner"
import { DialogService } from "src/app/service"
import { UpdateBannerFormComponent } from "../update-banner-form/update-banner-form.component"


@Component({
  selector: 'app-banner-manager',
  templateUrl: './banner-manager.component.html',
  styleUrls: ['./banner-manager.component.css']
})
export class BannerManagerComponent implements OnInit, OnChanges {
  @ViewChild('inputImage', { static: false }) inputImage: any

  selectedFiles?: FileList
  progressInfos: any[] = []
  message: string[] = []
  imageDataUrl: any =
    'https://previews.123rf.com/images/bonumopus/bonumopus1603/bonumopus160300089/53156323-empty-transparent-background-with-gradient-opacity-.jpg'
  fileList: Banner[]

  dataurlList: any[] = []

  constructor (
    private uploadService: BannerService,
    private dialogService: DialogService
  ) {}

  ngOnChanges () {}
  ngOnInit (): void {
    this.getFiles()
  }

  getFiles () {
    this.uploadService.getFiles().subscribe(data => {
      console.log(data)
      data.map(file => {
        file.link = this.setImage(file.imageName)
        return file
      })
      this.fileList = data
    })
  }
  selectFiles (event: any): void {
    this.message = []
    this.progressInfos = []
    this.selectedFiles = event.target.files

    this.previewFiles(event.target.files)
  }

  upload (idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name }

    if (file) {
      const form = new FormData()
      form.append('file', file)

      this.uploadService.uploadBanner(form).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            )
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name
            this.message.push(msg)

            setTimeout(() => {
              this.message = []
            }, 1500)
            this.getFiles()
          }
        },
        error: (err: any) => {
          console.log(err)
          this.progressInfos[idx].value = 0
          const msg = 'Could not upload the file: ' + file.name
          this.message.push(msg)
          this.getFiles()
        }
      })
    }
  }

  uploadFiles (): void {
    this.message = []

    if (this.selectedFiles) {
      console.log(this.selectedFiles)
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i])
      }
    }
  }

  setImage (name: string) {
    return `http://localhost:8081/image/${name}?${new Date().getTime()}`
  }

  clearFile () {
    // this.selectedFiles = null;
    this.imageDataUrl =
      'https://previews.123rf.com/images/bonumopus/bonumopus1603/bonumopus160300089/53156323-empty-transparent-background-with-gradient-opacity-.jpg'
  }

  readAndPreview (file): any {
    const dataurl: any = ''
    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      var reader = new FileReader()
      return new Promise(function (resolve, reject) {
        reader.onload = function (event) {
          resolve(event.target.result)
        }
        reader.readAsDataURL(file)
      })
    }
  }
  async previewFiles (files: any) {
    for (let i = 0; i < files.length; i++) {
      let file = files.item(i)
      const url = await this.readAndPreview(file)
      this.dataurlList.push(url)
    }
  }

  deleteFile (fileName: string) {
    this.uploadService.deleteFile(fileName).subscribe(() => {
      this.getFiles()
    })
  }

  updateFile (fileName: string) {
    this.dialogService
      .openDialog(
        {
          width: 600,
          height: 600,
          data: fileName
        },
        UpdateBannerFormComponent
      )
      .subscribe((data?) => {
        if (data === 'resetData') {
          this.getFiles()
        }
      })
  }
}
