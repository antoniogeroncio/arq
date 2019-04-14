/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { VersionDetailComponent } from 'app/entities/version/version-detail.component';
import { Version } from 'app/shared/model/version.model';

describe('Component Tests', () => {
    describe('Version Management Detail Component', () => {
        let comp: VersionDetailComponent;
        let fixture: ComponentFixture<VersionDetailComponent>;
        const route = ({ data: of({ version: new Version(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [VersionDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(VersionDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(VersionDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.version).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
