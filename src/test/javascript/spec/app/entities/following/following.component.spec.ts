/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ArqApplicationTestModule } from '../../../test.module';
import { FollowingComponent } from 'app/entities/following/following.component';
import { FollowingService } from 'app/entities/following/following.service';
import { Following } from 'app/shared/model/following.model';

describe('Component Tests', () => {
    describe('Following Management Component', () => {
        let comp: FollowingComponent;
        let fixture: ComponentFixture<FollowingComponent>;
        let service: FollowingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [FollowingComponent],
                providers: []
            })
                .overrideTemplate(FollowingComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FollowingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FollowingService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Following(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.followings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
