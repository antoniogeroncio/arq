/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ArqApplicationTestModule } from '../../../test.module';
import { VersionComponent } from 'app/entities/version/version.component';
import { VersionService } from 'app/entities/version/version.service';
import { Version } from 'app/shared/model/version.model';

describe('Component Tests', () => {
    describe('Version Management Component', () => {
        let comp: VersionComponent;
        let fixture: ComponentFixture<VersionComponent>;
        let service: VersionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [VersionComponent],
                providers: []
            })
                .overrideTemplate(VersionComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(VersionComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VersionService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Version(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.versions[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
