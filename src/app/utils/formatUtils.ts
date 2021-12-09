import dateFormat from 'dateformat'

export function formatDate(date: Date) {
	return dateFormat(date, "d'. 'mmm 'um' HH:MM")
}

export function formatDateDefault(date: Date) {
	return dateFormat(date, "d'.'mmm HH:MM")
}

export function formatMoney(amount: string | number) {
	const parsed = parseFloat(`${amount}`)
	if (isNaN(parsed)) {
		return '0,00'
	}
	return parsed.toLocaleString('de-DE', { minimumFractionDigits: 2 })
}

export function formatMoneyWithSign(amount: string | number) {
	return `${formatMoney(amount)}€`
}
