import dateFormat from 'dateformat'

export function formatDate(date: Date): string {
	return dateFormat(date, "d'. 'mmm 'um' HH:MM")
}

export function formatDateDefault(date: Date): string {
	return dateFormat(date, "d'.'mmm HH:MM")
}

export function formatMoney(amount: string | number): string {
	const parsed = parseFloat(`${amount}`)
	if (parsed === NaN) {
		return '0,00'
	}
	return parsed.toLocaleString('de-DE', { minimumFractionDigits: 2 })
}

export function formatMoneyWithSign(amount: string | number): string {
	return `${formatMoney(amount)}€`
}
