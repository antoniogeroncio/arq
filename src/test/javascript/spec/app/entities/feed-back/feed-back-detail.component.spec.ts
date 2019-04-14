/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { FeedBackDetailComponent } from 'app/entities/feed-back/feed-back-detail.component';
import { FeedBack } from 'app/shared/model/feed-back.model';

describe('Component Tests', () => {
    describe('FeedBack Management Detail Component', () => {
        let comp: FeedBackDetailComponent;
        let fixture: ComponentFixture<FeedBackDetailComponent>;
        const route = ({ data: of({ feedBack: new FeedBack(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [FeedBackDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FeedBackDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FeedBackDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.feedBack).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
