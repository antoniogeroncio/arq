/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ArqApplicationTestModule } from '../../../test.module';
import { CatalogDeleteDialogComponent } from 'app/entities/catalog/catalog-delete-dialog.component';
import { CatalogService } from 'app/entities/catalog/catalog.service';

describe('Component Tests', () => {
    describe('Catalog Management Delete Component', () => {
        let comp: CatalogDeleteDialogComponent;
        let fixture: ComponentFixture<CatalogDeleteDialogComponent>;
        let service: CatalogService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [CatalogDeleteDialogComponent]
            })
                .overrideTemplate(CatalogDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CatalogDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CatalogService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
