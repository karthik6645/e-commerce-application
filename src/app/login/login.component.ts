import { LoginServiceService } from './../login-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from './login';

declare var $:any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private service:LoginServiceService) { }
user:User=new User(null,null);
users:any;
// login validation
res:any
  ngOnInit(): void {
    this.service.getUsers().subscribe(data=>this.users=data);
  }
  validateUser(userName, password){
console.log(this.user)
for(let i in this.users){
if(userName==this.users[i].userName && password==this.users[i].password){
  console.log("in if")
  console.log(this.users[i].userName)
  console.log(this.users[i].password)
  this.router.navigate(['products-page'])
  break
}
else if(userName==this.users[i].userName && password!=this.users[i].password){
console.log("in else if")
console.log(this.users[i].userName)
console.log(this.users[i].password)
this.res="worngPassword"
break
}else {
  this.res="NoUser"
  console.log("in else")
  console.log(this.users[i].userName)
  console.log(this.users[i].password)
}
}
if(this.res=="worngPassword"){
     $('#passwordErrorMsg').text('Incorrect password')
  }
  else if(this.res=="NoUser"){
    $('#passwordErrorMsg').text('User does not exist')
  }
  else {
    $('#passwordErrorMsg').text('')
  }
  setTimeout(function(){$('#passwordErrorMsg').text('')}, 5000)
}
}
