/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ArqApplicationTestModule } from '../../../test.module';
import { StyleComponent } from 'app/entities/style/style.component';
import { StyleService } from 'app/entities/style/style.service';
import { Style } from 'app/shared/model/style.model';

describe('Component Tests', () => {
    describe('Style Management Component', () => {
        let comp: StyleComponent;
        let fixture: ComponentFixture<StyleComponent>;
        let service: StyleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [StyleComponent],
                providers: []
            })
                .overrideTemplate(StyleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StyleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StyleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Style(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.styles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
