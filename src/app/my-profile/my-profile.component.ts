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
  photo: File | null = null
  updateProfileForm: FormGroup;
  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.actualProfile = JSON.parse(localStorage['userProfile'])
    this.updateProfileForm = this.formBuilder.group({
      name: [""],
      email: [this.actualProfile.email, Validators.email],
    })
  }
  photoSelected(event: any) {
    this.photo = event.target.files[0]
  }
  sendProfileUpdated() {
    const updatedProfile = new FormData()
    if (this.photo) {
      updatedProfile.append("image", this.photo, this.photo?.name)
    }
    updatedProfile.append("name", this.updateProfileForm.value.name)
    updatedProfile.append("email", this.updateProfileForm.value.email)
    // console.table(updatedProfile);
    return this.usersService.updateUser(updatedProfile).subscribe()

  }
}
