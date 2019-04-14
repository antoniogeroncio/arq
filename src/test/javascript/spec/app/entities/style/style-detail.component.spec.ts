/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ArqApplicationTestModule } from '../../../test.module';
import { StyleDetailComponent } from 'app/entities/style/style-detail.component';
import { Style } from 'app/shared/model/style.model';

describe('Component Tests', () => {
    describe('Style Management Detail Component', () => {
        let comp: StyleDetailComponent;
        let fixture: ComponentFixture<StyleDetailComponent>;
        const route = ({ data: of({ style: new Style(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [ArqApplicationTestModule],
                declarations: [StyleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StyleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StyleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.style).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
