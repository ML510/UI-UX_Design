import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Login } from './page/login/login';
import { Dashboard } from "./page/dashboard/dashboard";
import { Candidate } from "./page/candidate/candidate";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, Dashboard, Candidate],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  ngOnInit(): void {
    initFlowbite();
  }
  protected readonly title = signal('demo');
}
