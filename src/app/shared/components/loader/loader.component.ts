import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  loaderState = false;
  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.getLoaderSubject().subscribe((state: boolean) => {
      this.loaderState = state
    })
  }
}
