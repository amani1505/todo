    import { Component, OnInit } from '@angular/core';
    import { FormsModule } from '@angular/forms';
    import { RouterOutlet } from '@angular/router';
    import { account, db, DB_ID, ID, storage, teams } from '../lib/appwrite';
    import { environment } from '../environment/environment';
    import { Permission, Role } from 'appwrite';
    
    @Component({
      selector: 'app-root',
      standalone: true,
      imports: [RouterOutlet, FormsModule],
      templateUrl: './app.component.html',
      styleUrl: './app.component.scss'
    })
    export class AppComponent implements OnInit {
      tasks: any
      logo: File;
      async ngOnInit(): Promise<void> {
        await this.checkAuthentication();
        this.getTasks()
      }
      title = 'todo';
    
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
    
      async register(email: string, password: string, name: string ) {
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
          this.tasks = (await db.listDocuments(DB_ID, environment.appwrite.taskCollectionId)).documents;
          console.log(this.tasks);
        } catch (error) {
          console.error('Failed to fetch tasks:', error);
          // Handle task fetching failure
        }
      }
      async create(){
        const user_id = this.loggedInUser.$id;
        console.log("user id",user_id)
       const task = await db.createDocument(DB_ID,environment.appwrite.taskCollectionId,ID.unique(),{
          title:"Dancing ",
          body:"Dancing All night"
        },[
          Permission.write(Role.user(user_id)),
          Permission.read(Role.any()),                  // Anyone can view this document,      // Writers can update this document
          Permission.update(Role.user(user_id)),        // Admins can update this document
          Permission.delete(Role.user(user_id))  
        ]);
    
        console.log("Task Saved Successfull",task)
      }

      onLogoSelectFile(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.logo = fileInput.files[0];
        }
    }
    async upload(){
     const upload = await storage.createFile(environment.appwrite.bucketId,ID.unique(),this.logo);
     const downloadUrl = await storage.getFileView(environment.appwrite.bucketId,upload.$id);
  console.log("uploaded file", upload);
  console.log("download URL", downloadUrl.href);

    }
    }
    