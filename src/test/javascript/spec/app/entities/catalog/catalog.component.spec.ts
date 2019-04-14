/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ArqApplicationTestModule } from '../../../test.module';
import { CatalogComponent } from 'app/entities/catalog/catalog.component';
import { CatalogService } from 'app/entities/catalog/catalog.service';
import { Catalog } from 'app/shared/model/catalog.model';

describe('Component Tests', () => {
    describe('Catalog Management Component', () => {
        let comp: CatalogComponent;
        let fixture: ComponentFixture<CatalogComponent>;
        let service: CatalogService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [CatalogComponent],
                providers: []
            })
                .overrideTemplate(CatalogComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CatalogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CatalogService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Catalog(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.catalogs[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
