import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Witch } from "./models/witch";
import { WitchService } from "./service/witch.service";
import { of as observableOf, merge, Observable } from 'rxjs';
import { map, startWith, switchMap, catchError } from 'rxjs/operators';
import { WitchPage } from './models/witch-page';

@Component({
  selector: 'app-witches',
  templateUrl: './witches.component.html',
  styleUrls: ['./witches.component.css']
})
export class WitchesComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  title: string = "Listado de Brujas";
  search: boolean = false;
  witchId: number;
  witchName: string;
  dataSource: MatTableDataSource<Witch> = new MatTableDataSource();

  columnsToDisplay = ['id', 'name', 'grade', 'actions'];

  public totalSize = 0;

  constructor(private witchService: WitchService) { }

  ngAfterViewInit() {

      // If the user changes the sort order, reset back to the first page.
      this.sort.sortChange.subscribe(() => {
                                this.paginator.pageIndex = 0;
                                this.sort.start=='asc' ? this.sort.start = 'desc' : this.sort.start = 'asc';
                              });
      merge(this.paginator.page, this.sort.sortChange)
      .pipe(
          startWith({}),
          switchMap(() => {
            //this.isLoadingResults = true;
            return this.witchService
                      .getWitches(this.paginator.pageIndex,
                                  this.paginator.pageSize,
                                  this.sort.active,
                                  this.sort.start.toString().toUpperCase(),
                                  this.witchName,
                                  this.witchId
                      );

          }),
          map(data => {
            //this.isLoadingResults = false;
            //this.isRateLimitReached = false;
            //alternatively to response headers;
            this.totalSize = data.totalElements;
            return data.content;
          }),
          catchError(() => {
            //this.isLoadingResults = false;
            //this.isRateLimitReached = true;
            this.totalSize = 0;
            return observableOf([]);
          })
      ).subscribe(data => {
        this.dataSource.data = data
      });
  }

  showGrade(supreme: boolean): string {
    return supreme ? 'Suprema' : 'Comun';
  }

  changeAction(): void {
    this.search ? this.search = false : this.search = true
  }

  searchWitch(): void {
    this.ngAfterViewInit();
  }

  clear(): void {
    this.witchId = null;
    this.witchName = null;
    this.ngAfterViewInit();
  }


}
