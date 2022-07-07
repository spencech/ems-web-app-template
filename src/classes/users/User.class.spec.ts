import { TestBed, async, tick, fakeAsync, inject, flush } from '@angular/core/testing';
import { IUser, Interfaces } from "../../classes/global/interfaces";
import { User } from "./User.class";
import { trace, clone } from "ems-web-app-utils"
import { expectStrictInterfaceForObject } from "../../utils/methods.test";
import stump from "../../assets/user.stump.json";
import * as _ from "underscore";


describe('User.class', () => {
	let validUser: User, invalidUser: User;

	beforeEach(() => {
		validUser = new User(stump);
	});

	it("should have a defined first name", () => {
		expect(validUser.firstName).toBe("Chris");
	});

	it("should have a defined last name", () => {
		expect(validUser.lastName).toBe("Spence");
	});

	it("should have a defined email", () => {
		expect(validUser.email).toBe("user@email.com");
	});

	it("should have a defined id", () => {
		expect(validUser.id).toBe("1");
	});

	it("should be valid if all fields are defined and well formatted", () => {
		const validation = validUser.validate();
		expect(validation).toBe(true);
	})

	it("should be invalid if first name is missing", () => {
		const source = clone(stump);
		delete source.firstName;
		invalidUser = new User(source);
		expect(invalidUser.firstName).toBeUndefined();

		const validation = invalidUser.validate();
		expect(validation).toHaveSize(1);
	});

	it("should be invalid if last name is missing", () => {
		const source = clone(stump);
		delete source.lastName;
		invalidUser = new User(source);
		expect(invalidUser.lastName).toBeUndefined();

		const validation = invalidUser.validate();
		expect(validation).toHaveSize(1);
	});

	it("should be invalid if email is missing", () => {
		const source = clone(stump);
		delete source.email;
		invalidUser = new User(source);
		expect(invalidUser.email).toBeUndefined();

		const validation = invalidUser.validate();
		expect(validation).toHaveSize(1);
	});

	it("should be invalid if email is incorrectly formatted", () => {
		const source = clone(stump);
		source.email = "test@test.c";
		invalidUser = new User(source);
		expect(invalidUser.email).toBe("test@test.c");

		const validation = invalidUser.validate();
		expect(validation).toHaveSize(1);
	});

	it("should return multiple validate errors if more than one invalid property exists", () => {
		const source = clone(stump);
		delete source.firstName;
		source.email = "test@test.c";
		invalidUser = new User(source);
		expect(invalidUser.firstName).toBeUndefined();
		expect(invalidUser.email).toBe("test@test.c");

		const validation = invalidUser.validate();
		expect(validation).toHaveSize(2);
	});

	it("should return a copy of the user fields as an IUser record when exported", () => {
		const exported = validUser.export();
		expectStrictInterfaceForObject(Interfaces.IUser, exported);

		Object.keys(exported).forEach(key => {
			//@ts-ignore
			expect(exported[key]).toEqual(validUser[key])
		});
	});

	it("should return a copy that includes updated user fields as an IUser record when exported", () => {
		const modifiedUser = validUser.clone();
		modifiedUser.email = "tester@test.com";
		const exported = modifiedUser.export();
		expectStrictInterfaceForObject(Interfaces.IUser, exported);

		Object.keys(exported).forEach(key => {
			//@ts-ignore
			expect(exported[key]).toEqual(modifiedUser[key])
		});
	});

	it("should return an exact clone with this method is invoked", () => {
		const clone = validUser.clone();
		Object.keys(clone).forEach(key => {
			//@ts-ignore
			expect(clone[key]).toEqual(validUser[key])
		});
	});

	it("should not impact the source user when a cloned user is modified", () => {
		const clone = validUser.clone();
		clone.email = "tester-2@test.com";
		expect(clone.email).not.toBe(validUser.email);
	});
});
