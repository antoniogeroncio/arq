/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ArqApplicationTestModule } from '../../../test.module';
import { FeedBackDeleteDialogComponent } from 'app/entities/feed-back/feed-back-delete-dialog.component';
import { FeedBackService } from 'app/entities/feed-back/feed-back.service';

describe('Component Tests', () => {
    describe('FeedBack Management Delete Component', () => {
        let comp: FeedBackDeleteDialogComponent;
        let fixture: ComponentFixture<FeedBackDeleteDialogComponent>;
        let service: FeedBackService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [FeedBackDeleteDialogComponent]
            })
                .overrideTemplate(FeedBackDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FeedBackDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FeedBackService);
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
