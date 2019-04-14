/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ArqApplicationTestModule } from '../../../test.module';
import { RequirementsComponent } from 'app/entities/requirements/requirements.component';
import { RequirementsService } from 'app/entities/requirements/requirements.service';
import { Requirements } from 'app/shared/model/requirements.model';

describe('Component Tests', () => {
    describe('Requirements Management Component', () => {
        let comp: RequirementsComponent;
        let fixture: ComponentFixture<RequirementsComponent>;
        let service: RequirementsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [RequirementsComponent],
                providers: []
            })
                .overrideTemplate(RequirementsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RequirementsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RequirementsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Requirements(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.requirements[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
