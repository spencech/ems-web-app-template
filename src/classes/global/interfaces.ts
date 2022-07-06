export interface IExportable {
	export: () => unknown
}

export interface IClonable {
	clone: () => unknown
}

export interface IValidator {
	validate: () => boolean | string
}

export interface IDownloadable {
	download: () => void
}