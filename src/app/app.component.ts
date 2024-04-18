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


}
