export interface IExportable {
	export: () => unknown
}

export interface IClonable {
	clone: () => unknown
}

export interface IValidator {
	validate: () => boolean | string[]
}

export interface IDownloadable {
	download: () => void
}

export interface IUser {
	id?: string,
	firstName: string,
	lastName: string,
	email: string
}



//used for validating object conformance in tests
//conversion regex: ^(?:\s+)?(.*?):.*?$\n? => "$1",
export class Interfaces {
	public static readonly IUser: string[] = ["id?","firstName","lastName","email"];
}