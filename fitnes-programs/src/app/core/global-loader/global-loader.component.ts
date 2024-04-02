import { Component } from '@angular/core';
import { GlobalLoaderService } from './global-loader.service';

@Component({
  selector: 'app-global-loader',
  templateUrl: './global-loader.component.html',
  styleUrls: ['./global-loader.component.css']
})
export class GlobalLoaderComponent {
  constructor(private globalLoaderService: GlobalLoaderService) { }

  get isLoading(){
    return this.globalLoaderService.isLoading();
  }
}
