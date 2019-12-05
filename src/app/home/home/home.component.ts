import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/interface/pet';
import { PetService } from 'src/app/services/pet.service';
import { AuthService } from 'src/app/service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  pet$: Observable<Pet> = this.petService.getPet(
    this.authService.uid
  );

  constructor(
    private petService: PetService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

}
