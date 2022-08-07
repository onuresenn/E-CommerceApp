import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, of, switchMap, timer } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;

  constructor(private fb:FormBuilder ,private accountService:AccountService,private router:Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
        displayName:[null,[Validators.required]],
        email:[null,
          [
            Validators.required,],
           [this.validateEmailNotTaken()]],
        password : [null,[Validators.required]]
    });
  }

  onSubmit(){
    this.accountService.register(this.registerForm.value).subscribe(response=>{
      this.router.navigateByUrl('/shop');
    },error=>{
      console.log(error);
    })
  }

  validateEmailNotTaken():AsyncValidatorFn{
    return control=>{
      return timer(500).pipe(
        switchMap(()=>{
          if(!control.value){
            return of(null);
          }
          return this.accountService.checkEmailExist(control.value).pipe(
            map(res=>{
              return res ? {emailExists:true} :null;
            })
          );
        })
      );
    };
  }

}
