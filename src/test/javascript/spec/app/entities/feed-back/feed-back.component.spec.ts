/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ArqApplicationTestModule } from '../../../test.module';
import { FeedBackComponent } from 'app/entities/feed-back/feed-back.component';
import { FeedBackService } from 'app/entities/feed-back/feed-back.service';
import { FeedBack } from 'app/shared/model/feed-back.model';

describe('Component Tests', () => {
    describe('FeedBack Management Component', () => {
        let comp: FeedBackComponent;
        let fixture: ComponentFixture<FeedBackComponent>;
        let service: FeedBackService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [FeedBackComponent],
                providers: []
            })
                .overrideTemplate(FeedBackComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FeedBackComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FeedBackService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FeedBack(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.feedBacks[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
