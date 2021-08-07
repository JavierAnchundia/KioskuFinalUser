import { Component, OnInit } from '@angular/core';
import { MembershipService } from 'src/app/services/membership/membership.service';

@Component({
  selector: 'app-membership-list',
  templateUrl: './membership-list.component.html',
  styleUrls: ['./membership-list.component.css']
})
export class MembershipListComponent implements OnInit {

  public membershipList: any[] = [];

  constructor(
    private membresia: MembershipService,
  ) { }

  ngOnInit(): void {
    this.loadMemberships();
  }

  loadMemberships(): void{
    this.membresia.retrieveMemberships()
    .then(data => this.membershipList = data)
    .catch(err => console.error(err))
  }

}
