import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: any){
    console.log(event);
    const selectedFiles = <FileList>event.target.files;
    //(document.getElementById('customFileLabel')as HTMLElement).innerHTML = selectedFiles[0].name;

    const fileNames = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name)
    }
    (document.getElementById('customFileLabel')as HTMLElement).innerHTML = fileNames.join(', ');
  }

}
