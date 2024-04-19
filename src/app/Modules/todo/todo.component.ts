import { CdkDropListGroup, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { account, db, DB_ID, ID } from '../../../lib/appwrite';
import { environment } from '../../../environment/environment';
import { Permission, Role } from 'appwrite';
import { AuthService } from '../../Auth/Guard/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, NgxSkeletonLoaderModule, NgOptimizedImage, CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent implements OnInit {
  tasks: any
  logo: File;
  currentTask: any
  image: any
  todo: boolean = false;
  progress: boolean = false;
  done: boolean = false;
  todoTitle: string = ""
  progressTitle: string = ""
  doneTitle: string = ""
  ticket: any[] = []
  loading: boolean = true

  name: string = ''
  constructor(private _authService: AuthService, private _route: Router) { }

  ngOnInit(): void {
    this.getTasks()

    
  }

  async getTasks(): Promise<void> {
    try {
      this.ticket = (await db.listDocuments(DB_ID, environment.appwrite.taskCollectionId)).documents;
      this.loading = false

    } catch (error) {
      alert(`Failed to fetch tasks: ${error}`);
      this.loading = false
      // Handle task fetching failure
    }
  }





  filter(status: string) {
    return this.ticket.filter(m => m.status == status)
  }
  onDrop(event: CdkDragDrop<any[]>, status: string) {
    const droppedItem = event.previousContainer.data[event.previousIndex];

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      db.updateDocument(droppedItem.$databaseId, droppedItem.$collectionId, droppedItem.$id, { status: status }).then(() => {
        alert('Status updated successfully.');
        this.getTasks();
      })
        .catch((error) => {
          alert(`Failed to update status:`);
          // Handle error
        });
    }


  }
  onClick(status: string) {
    if (status == 'todo') {
      this.todo = !this.todo

    } else if (status == 'progress') {
      this.progress = !this.progress

    } else if (status == 'done') {
      this.done = !this.done
    }

  }
  async submit(status: string) {
    let title: string;
    let updateFlag: boolean;

    switch (status) {
      case 'todo':
        title = this.todoTitle;
        this.todoTitle = null;
        this.todo = false;
        break;
      case 'progress':
        title = this.progressTitle;
        this.progressTitle = null;
        this.progress = false;
        break;
      case 'done':
        title = this.doneTitle;
        this.doneTitle = null;
        this.done = false;
        break;
      default:
        title = '';
    }
    await db.createDocument(DB_ID, environment.appwrite.taskCollectionId, ID.unique(), {
      title: title,
      status: status
    }, [
      Permission.write(Role.any()),
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any())
    ]);
    this.getTasks()

  }
  signout() {
    this._authService.signOut().then(() => {
      this._route.navigateByUrl('/sign-in');
    })

  }
}
