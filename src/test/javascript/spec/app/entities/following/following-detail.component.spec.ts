/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { FollowingDetailComponent } from 'app/entities/following/following-detail.component';
import { Following } from 'app/shared/model/following.model';

describe('Component Tests', () => {
    describe('Following Management Detail Component', () => {
        let comp: FollowingDetailComponent;
        let fixture: ComponentFixture<FollowingDetailComponent>;
        const route = ({ data: of({ following: new Following(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [FollowingDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FollowingDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FollowingDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.following).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
