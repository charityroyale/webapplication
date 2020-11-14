import dateFormat from 'dateformat'

export function formatDate(date: Date): string {
	return dateFormat(date, "d'. 'mmm 'um' HH:MM")
}

export function formatDateDefault(date: Date): string {
	return dateFormat(date, "d'.'mmm HH:MM")
}
