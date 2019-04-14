/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ArqApplicationTestModule } from '../../../test.module';
import { StyleDeleteDialogComponent } from 'app/entities/style/style-delete-dialog.component';
import { StyleService } from 'app/entities/style/style.service';

describe('Component Tests', () => {
    describe('Style Management Delete Component', () => {
        let comp: StyleDeleteDialogComponent;
        let fixture: ComponentFixture<StyleDeleteDialogComponent>;
        let service: StyleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [StyleDeleteDialogComponent]
            })
                .overrideTemplate(StyleDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StyleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StyleService);
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
