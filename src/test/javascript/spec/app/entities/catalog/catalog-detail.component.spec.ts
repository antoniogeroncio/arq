/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { CatalogDetailComponent } from 'app/entities/catalog/catalog-detail.component';
import { Catalog } from 'app/shared/model/catalog.model';

describe('Component Tests', () => {
    describe('Catalog Management Detail Component', () => {
        let comp: CatalogDetailComponent;
        let fixture: ComponentFixture<CatalogDetailComponent>;
        const route = ({ data: of({ catalog: new Catalog(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [CatalogDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CatalogDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CatalogDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.catalog).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
