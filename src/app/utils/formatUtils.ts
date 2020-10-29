import dateFormat from 'dateformat'

export function formatDate(date: Date): string {
	return dateFormat(date, "d'.'mm 'um' HH:MM")
}
