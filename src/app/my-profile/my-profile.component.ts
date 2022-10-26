import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  faFloppyDisk = faFloppyDisk
  actualProfile: User
  photoRetriver: boolean
  file: File | null = null
  updateProfileForm: FormGroup;
  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.actualProfile = JSON.parse(localStorage['userProfile'])
    this.updateProfileForm = this.formBuilder.group({
      name: [this.actualProfile.name||""],
      photo: [this.actualProfile.photo],
      email: [this.actualProfile.email, Validators.email],
    })
    
  }
  changePhoto() {
    this.photoRetriver = true
  }
  photoSelected(event: Event) {
    this.file = (event.target as HTMLInputElement).files![0]
    this.actualProfile.photo = this.file.name
    console.log(this.file.name);
    
  }
  sendProfile() {
    const formData = new FormData()
    // formData.append("name", this.updateProfileForm.get('name').value)
    // formData.append("photo", this.updateProfileForm.get('photo').value)
    console.table(formData);
  

  }
}
