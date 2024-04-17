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
  imports: [RouterOutlet, FormsModule, NgxSkeletonLoaderModule, NgOptimizedImage,CdkDropListGroup, CdkDropList, CdkDrag],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
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

  async ngOnInit(): Promise<void> {
    await this.checkAuthentication();
    this.getTasks()
  }


  loggedInUser: any = null;
  email: string = '';
  password: string = '';
  name: string = '';

  async login(email: string, password: string) {
    await account.createEmailSession(email, password);
    this.loggedInUser = await account.get();
  }

  async checkAuthentication(): Promise<void> {
    try {
      // Check if user is logged in
      await account.get();
      this.loggedInUser = await account.get();
    } catch (error) {
      // Handle authentication failure
      console.error('User not authenticated');
      // Redirect to login page or handle as appropriate
    }
  }

  async register(email: string, password: string, name: string) {
    const user = await account.create(ID.unique(), email, password, name,)
    this.login(email, password);

  }

  async logout() {
    await account.deleteSession('current');
    this.loggedInUser = null;
  }

  async getTasks(): Promise<void> {
    try {
      // Ensure authentication before fetching tasks
      if (!this.loggedInUser) {
        throw new Error('User not authenticated');
      }

      // Fetch tasks
      this.ticket = (await db.listDocuments(DB_ID, environment.appwrite.taskCollectionId)).documents;
     
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      // Handle task fetching failure
    }
  }
  async create() {
    const user_id = this.loggedInUser.$id;
    console.log("user id", user_id)
    const task = await db.createDocument(DB_ID, environment.appwrite.taskCollectionId, ID.unique(), {
      title: "Dancing ",
      body: "Dancing All night"
    }, [
      Permission.write(Role.user(user_id)),
      Permission.read(Role.any()),                  // Anyone can view this document,      // Writers can update this document
      Permission.update(Role.user(user_id)),        // Admins can update this document
      Permission.delete(Role.user(user_id))
    ]);

    console.log("Task Saved Successfull", task)
  }

  onLogoSelectFile(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.logo = fileInput.files[0];
    }
  }
  async upload() {
    const upload = await storage.createFile(environment.appwrite.bucketId, ID.unique(), this.logo);
    const downloadUrl = await storage.getFileView(environment.appwrite.bucketId, upload.$id);
    console.log("uploaded file", upload);
    console.log("download URL", downloadUrl.href);


  }

  filter(status: string) {
  
    return this.ticket.filter(m => m.status == status)
  }
  onDragStart(task: any) {
    this.currentTask = task

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
        alert(`Failed to update status: ${error}`);
        // Handle error
      });
    }
   

    // if (record != undefined) {
    //   db.updateDocument(DB_ID, environment.appwrite.taskCollectionId, this.currentTask.$id, { status: status })
     
    // }
    // this.filter(status)
  }
  onDragOver(event: any) {

    event.preventDefault()
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

}
