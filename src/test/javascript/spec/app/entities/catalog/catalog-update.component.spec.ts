/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { CatalogUpdateComponent } from 'app/entities/catalog/catalog-update.component';
import { CatalogService } from 'app/entities/catalog/catalog.service';
import { Catalog } from 'app/shared/model/catalog.model';

describe('Component Tests', () => {
    describe('Catalog Management Update Component', () => {
        let comp: CatalogUpdateComponent;
        let fixture: ComponentFixture<CatalogUpdateComponent>;
        let service: CatalogService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [CatalogUpdateComponent]
            })
                .overrideTemplate(CatalogUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CatalogUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CatalogService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Catalog(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.catalog = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Catalog();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.catalog = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
