import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InputInvestComponent } from './input-invest.component';

describe('InputInvestComponent', () => {
  let component: InputInvestComponent;
  let fixture: ComponentFixture<InputInvestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputInvestComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InputInvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
