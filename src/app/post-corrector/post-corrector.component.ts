import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-post-corrector',
  templateUrl: './post-corrector.component.html',
  styleUrls: ['./post-corrector.component.scss']
})
export class PostCorrectorComponent implements OnInit {

image: File | null = null
  constructor() { }
  ngOnInit(): void {
  }
  // photoSelected(event: any) {
  //   this.image = event.target.files[0]
  // }
  // sendProfileUpdated(usersService:UsersService) {
  //   const updatedProfile = new FormData()
  //   if (this.image) {
  //     updatedProfile.append("image", this.image, this.image?.name)
  //   }
  //   updatedProfile.append("name", this.updateProfileForm.value.name)
  //   updatedProfile.append("email", this.updateProfileForm.value.email)
  //   // console.table(updatedProfile);
  //   return this.usersService.updateUser(updatedProfile).subscribe()

  // }
}
