import { TestBed, fakeAsync  } from '@angular/core/testing';
import { AppService } from "../../services";
import { User } from "../../classes";
import { Observable } from 'rxjs';
import stump from "../../assets/user.stump.json";

describe('AppService', () => {
  let appService: AppService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [AppService],
      declarations: [],
    })

    appService = TestBed.inject(AppService);
  });

  describe("#setCurrentUser", () => {
  	it("should update the user observable", fakeAsync(() => {
  		let called = false;
      let currentUser = new User(stump);
  		appService.user.subscribe(user => {
  			if(!called) expect(user).toBeUndefined() //initial call on subscription
  			else expect(user).toBe(currentUser);
  			called = true;
  		});
   		appService.setCurrentUser(currentUser);
  	}));
  });
});