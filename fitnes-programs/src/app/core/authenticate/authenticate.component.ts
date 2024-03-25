import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { GlobalLoaderService } from '../global-loader.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true

  constructor(private userService: UserService, private globalLoaderServices: GlobalLoaderService) {
    globalLoaderServices.isLoading = true;
  }

  ngOnInit(): void {
    this.authenticating();
  }

  authenticating() {
    this.userService.getCurrentUser().subscribe({
      next: () => {
        this.isAuthenticating = false;
        this.globalLoaderServices.isLoading = false;
      },
      error: () => {
        this.isAuthenticating = false;
        this.globalLoaderServices.isLoading = false;
      },
      complete: () => {
        this.isAuthenticating = false;
        this.globalLoaderServices.isLoading = false;
      },
    })
  }
}
