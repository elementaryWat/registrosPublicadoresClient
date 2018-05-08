import { Component, OnInit, ElementRef } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private elementRef:ElementRef) { }

  ngOnInit() {}
  
  ngAfterViewInit() {
    // Force the toggled class to be removed when a collapsible nav link is clicked
    $(".navbar-sidenav .nav-link-collapse").click((e) => {
      e.preventDefault();
      $("body").removeClass("sidenav-toggled");
    });
    $('#sidenavToggler').click((e)=>{
      e.preventDefault();
      $("body").toggleClass("sidenav-toggled");
      $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
      $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
    })
  }

}
