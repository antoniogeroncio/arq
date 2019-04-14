/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ArqApplicationTestModule } from '../../../test.module';
import { VersionDeleteDialogComponent } from 'app/entities/version/version-delete-dialog.component';
import { VersionService } from 'app/entities/version/version.service';

describe('Component Tests', () => {
    describe('Version Management Delete Component', () => {
        let comp: VersionDeleteDialogComponent;
        let fixture: ComponentFixture<VersionDeleteDialogComponent>;
        let service: VersionService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [VersionDeleteDialogComponent]
            })
                .overrideTemplate(VersionDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VersionDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VersionService);
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
