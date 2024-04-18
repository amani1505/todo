import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { account, db, DB_ID, ID, storage, teams } from '../lib/appwrite';
import { environment } from '../environment/environment';
import { Permission, Role } from 'appwrite';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgOptimizedImage } from '@angular/common';
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  // tasks: any
  // logo: File;
  // currentTask: any
  // image: any
  // todo: boolean = false;
  // progress: boolean = false;
  // done: boolean = false;
  // todoTitle: string = ""
  // progressTitle: string = ""
  // doneTitle: string = ""
  // ticket: any[] = []
  // loading:boolean = true
  // loggedInUser: any = null;
  // email: string = '';
  // password: string = '';
  // name: string = '';

  // async ngOnInit(): Promise<void> {
  //   await this.checkAuthentication();
  //   this.getTasks()
  // }




  // async login(email: string, password: string) {
  //   await account.createEmailSession(email, password);
  //   this.loggedInUser = await account.get();
  // }

  // async checkAuthentication(): Promise<void> {
  //   try {
  //     // Check if user is logged in
  //     await account.get();
  //     this.loggedInUser = await account.get();
  //   } catch (error) {
  //     // Handle authentication failure
  //     console.error('User not authenticated');
  //     // Redirect to login page or handle as appropriate
  //   }
  // }

  // async register(email: string, password: string, name: string) {
  //   const user = await account.create(ID.unique(), email, password, name,)
  //   this.login(email, password);

  // }

  // async logout() {
  //   await account.deleteSession('current');
  //   this.loggedInUser = null;
  // }




  // onLogoSelectFile(event: Event) {
  //   const fileInput = event.target as HTMLInputElement;
  //   if (fileInput.files && fileInput.files.length > 0) {
  //     this.logo = fileInput.files[0];
  //   }
  // }
  // async upload() {
  //   const upload = await storage.createFile(environment.appwrite.bucketId, ID.unique(), this.logo);
  //   const downloadUrl = await storage.getFileView(environment.appwrite.bucketId, upload.$id);
  //   console.log("uploaded file", upload);
  //   console.log("download URL", downloadUrl.href);


  // }





}
