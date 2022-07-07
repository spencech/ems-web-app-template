import { IUser, IClonable, IValidator, IExportable, BooleanString } from "../";
import { empty, validateEmail } from "ems-web-app-utils";

export class User implements IUser, IClonable, IValidator, IExportable {

	public static generateUsers(users: IUser[]) {
		return users.map(User.generateUser);
	}

	public static generateUser(user: IUser) {
		return new User(user);
	}

	protected _id: string | undefined;
	protected _firstName: string;
	protected _lastName: string;
	protected _email: string;
	protected _source: IUser;

	constructor(user: IUser) {
		this._id = user.id;
		this._firstName = user.firstName;
		this._lastName = user.lastName;
		this._email = user.email;
		this._source = user;
	}

	get id(): string | undefined {
		return this._id;
	}

	set id(value: string | undefined){
		this._id = value;
	}

	get firstName(): string {
		return this._firstName;
	}

	set firstName(value: string){
		this._firstName = value;
	}

	get lastName(): string {
		return this._lastName;
	}

	set lastName(value: string){
		this._lastName = value;
	}

	get email(): string {
		return this._email;
	}

	set email(value: string){
		this._email = value;
	}

	clone(): User {
		return new User(this.export());
	}

	validate(): boolean | string {
		const errors = [];
		if(empty(this.email)) errors.push("Missing Email");
		else if(!validateEmail(this.email)) errors.push("Invalid Email");
		if(empty(this.firstName)) errors.push("Missing First Name");
		if(empty(this.lastName)) errors.push("Missing Last Name");
		return empty(errors) ? true : errors.join(",");
	}
	export(): IUser {
		return {
			id: this.id,
			firstName: this.firstName,
			lastName: this.lastName,
			email: this.email
		}
	}

}