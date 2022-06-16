import { Component, Inject, OnInit, ViewChild } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { BannerService } from '../api/service/banner_service'

@Component({
  selector: 'app-update-banner-form',
  templateUrl: './update-banner-form.component.html',
  styleUrls: ['./update-banner-form.component.css']
})
export class UpdateBannerFormComponent implements OnInit {
  selectedFiles: any
  imageDataUrl: any =
    'https://previews.123rf.com/images/bonumopus/bonumopus1603/bonumopus160300089/53156323-empty-transparent-background-with-gradient-opacity-.jpg'
  constructor (
    public dialogRef: MatDialogRef<UpdateBannerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public fileName: string,
    private uploadService: BannerService
  ) {}
  @ViewChild('inputImage', { static: false }) inputImage
  ngOnInit (): void {
    this.imageDataUrl = `http://localhost:8081/image/${this.fileName}?${new Date().getTime()}`
  }
  selectFiles (): void {
    const target = this.inputImage.nativeElement
    if (target.files && target.files.length) {
      const [file] = target.files
      this.selectedFiles = file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = _event => {
        this.imageDataUrl = reader.result
      }
    }
  }
  uploadFiles () {
    if (
      this.imageDataUrl !==
      'https://previews.123rf.com/images/bonumopus/bonumopus1603/bonumopus160300089/53156323-empty-transparent-background-with-gradient-opacity-.jpg'
    ) {
      const form = new FormData()
      form.append('file', this.selectedFiles)
      this.uploadService.UPDATEFile(this.fileName, form).subscribe(() => {
        this.dialogRef.close('resetData')
      })
    }
  }
}
