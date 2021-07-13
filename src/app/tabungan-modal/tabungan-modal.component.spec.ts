import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TabunganModalComponent } from './tabungan-modal.component';

describe('TabunganModalComponent', () => {
  let component: TabunganModalComponent;
  let fixture: ComponentFixture<TabunganModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabunganModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TabunganModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
