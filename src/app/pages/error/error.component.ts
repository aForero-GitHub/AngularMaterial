import { Params, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  status: string;
  message: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.status = params['status'];
      // tslint:disable-next-line: no-string-literal
      this.message = params['message'];
    });

  }
}
