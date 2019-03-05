import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SupremeDTO } from '../models/supremeDTO';
import { CommonDTO } from '../models/commonDTO';
import { WitchService } from '../service/witch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-witch-form',
  templateUrl: './witch-form.component.html',
  styleUrls: ['./witch-form.component.css']
})
export class WitchFormComponent implements OnInit {

  supremeDTO: SupremeDTO = new SupremeDTO();
  commonDTO: CommonDTO = new CommonDTO();
  isSupreme: boolean;
  action: string;
  idControl = new FormControl('', [Validators.required]);


  constructor(private witchService: WitchService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.isSupreme = false;
    this.loadWitch();
  }

  public createSupreme(): void {
    this.witchService.createSupreme(this.supremeDTO)
    .subscribe( supremeDTO => {
        this.router.navigate(['/witches']);
        Swal.fire({
          type: 'success',
          title: 'Creado!',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  public createCommon(): void {
    this.witchService.createCommon(this.commonDTO)
    .subscribe( commonDTO => {
      this.router.navigate(['/witches'])
      Swal.fire({
        type: 'success',
        title: 'Creado!',
        showConfirmButton: false,
        timer: 1500
      })
    }
    )
  }

  loadWitch(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.action = params['action'];
        this.witchService.getWitchById(id).subscribe((witch) => {
          this.isSupreme = witch.supreme;
          if(this.isSupreme) {
            this.supremeDTO = <SupremeDTO> witch;
            this.supremeDTO.bornDate = new Date(this.supremeDTO.bornDate);
          } else {
            this.commonDTO = <CommonDTO> witch;
          }
        })
      } else {
        this.action = 'create';
      }
    })
  }

  public updateSupreme(): void {
    this.witchService.updateSupreme(this.supremeDTO)
      .subscribe( witch => {
        this.router.navigate(['/witches']);
        Swal.fire({
          type: 'success',
          title: 'Actualizado!',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  public updateCommon(): void {
    this.witchService.updateCommon(this.commonDTO)
      .subscribe( witch => {
        this.router.navigate(['/witches']);
        Swal.fire({
          type: 'success',
          title: 'Actualizado!',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  public deleteSupreme(): void {
    this.witchService.delete(this.supremeDTO.id)
      .subscribe( witch => {
        this.router.navigate(['/witches']);
        Swal.fire({
          type: 'success',
          title: 'Borrado!',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

  public deleteCommon(): void {
    this.witchService.delete(this.commonDTO.id)
      .subscribe( witch => {
        this.router.navigate(['/witches']);
        Swal.fire({
          type: 'success',
          title: 'Borrado!',
          showConfirmButton: false,
          timer: 1500
        })
      })
  }

}
