import { Component } from '@angular/core';
import { ImageUploadService } from './services/image-upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 16 Multiple Image Upload with Preview';
  selectedFiles: any;
  previews: string[] = [];
  fetchedData: any;
  
  constructor(private imageUploadService: ImageUploadService) { }

  ngOnInit() {
    this.fetchImages();
  }

  upload() {
    const file = this.selectedFiles;
    if(this.selectedFiles.length > 0) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.imageUploadService.uploadFile(this.selectedFiles[i]);
      }
      this.fetchImages();
    }
  }

  fetchImages() {
    this.imageUploadService.fetchImages().then(res=>{
      this.fetchedData = res;
    });
  }

  selectFiles(event: any): void {
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }
}
