import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Observable } from 'rxjs'
import { BannerService } from '../api/cart/banner_service'

@Component({
  selector: 'app-banner-manager',
  templateUrl: './banner-manager.component.html',
  styleUrls: ['./banner-manager.component.css']
})
export class BannerManagerComponent implements OnInit {
  @ViewChild('inputImage', { static: false }) inputImage

  selectedFiles?: FileList
  progressInfos: any[] = []
  message: string[] = []
  imageDataUrl: any =
    'https://previews.123rf.com/images/bonumopus/bonumopus1603/bonumopus160300089/53156323-empty-transparent-background-with-gradient-opacity-.jpg'
  fileInfos?: Observable<any>

  constructor (private uploadService: BannerService) {}

  ngOnInit (): void {
    this.fileInfos = this.uploadService.getFiles()
  }

  selectFiles (event: any): void {
    this.message = []
    this.progressInfos = []
    this.selectedFiles = event.target.files
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
            this.fileInfos = this.uploadService.getFiles()
          }
        },
        error: (err: any) => {
          console.log(err)
          this.progressInfos[idx].value = 0
          const msg = 'Could not upload the file: ' + file.name
          this.message.push(msg)
          this.fileInfos = this.uploadService.getFiles()
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

  clearFile () {
    // this.selectedFiles = null;
    this.imageDataUrl =
      'https://previews.123rf.com/images/bonumopus/bonumopus1603/bonumopus160300089/53156323-empty-transparent-background-with-gradient-opacity-.jpg'
  }
}
