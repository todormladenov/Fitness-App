import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { GlobalLoaderService } from '../global-loader/global-loader.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true

  constructor(private userService: UserService, private globalLoaderServices: GlobalLoaderService) { }

  ngOnInit(): void {
    this.authenticating();
  }
  
  authenticating() {
    this.globalLoaderServices.setLoadingState(true);

    this.userService.getCurrentUser().subscribe({
      next: () => {
        this.isAuthenticating = false;
        this.globalLoaderServices.setLoadingState(false);
      },
      error: () => {
        this.isAuthenticating = false;
        this.globalLoaderServices.setLoadingState(false);
      },
      complete: () => {
        this.isAuthenticating = false;
        this.globalLoaderServices.setLoadingState(false);
      },
    })
  }
}
