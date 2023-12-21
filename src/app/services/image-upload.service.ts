import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor() { }

  uploadFile(file: any) {
    return new Promise((resolve, reject) => {
      const contentType = file.type;
      const bucket = new S3({
        accessKeyId: 'AKIA4XF7TG4AJZM4WSJ2', // ACCESS_KEY_ID
        secretAccessKey: '', // SECRET_ACCESS_KEY
        region: 'ap-south-1', // BUCKET_REGION
      });
      const params = {
        Bucket: 'bacbash-2023', //BUCKET_NAME
        Key: file.name,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType,
      };
      bucket.upload(params, function (err: any, data: any) {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }

  fetchImages() {
    return new Promise((resolve, reject) => {
      const bucket = new S3({
        accessKeyId: 'AKIA4XF7TG4AJZM4WSJ2', // ACCESS_KEY_ID
        secretAccessKey: '', // SECRET_ACCESS_KEY
        region: 'ap-south-1', // BUCKET_REGION
      });
      const params = {
        Bucket: 'bacbash-2023', //BUCKET_NAME
      };
      const bucketUrl = "https://bacbash-2023.s3.ap-south-1.amazonaws.com/"
      bucket.listObjects(params, function (err, data) {
        if (err) {
          console.log('There was an error getting your files: ' + err);
          reject(err);
        }
        console.log('Successfully get files.', data);
        let imgArr : any[]=[];
        if(data.Contents) {
          data?.Contents.map((photo) => {
            var photoKey = photo.Key;
            imgArr.push(bucketUrl + (photoKey));
          });
        }
        resolve(imgArr);
      });
    });
  }
}
