/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { RequirementsDetailComponent } from 'app/entities/requirements/requirements-detail.component';
import { Requirements } from 'app/shared/model/requirements.model';

describe('Component Tests', () => {
    describe('Requirements Management Detail Component', () => {
        let comp: RequirementsDetailComponent;
        let fixture: ComponentFixture<RequirementsDetailComponent>;
        const route = ({ data: of({ requirements: new Requirements(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [RequirementsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RequirementsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RequirementsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.requirements).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
