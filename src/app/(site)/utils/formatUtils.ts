const dateFormatter = Intl.DateTimeFormat('de-AT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
export function formatDate(date: Date) {
	return dateFormatter.format(date)
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
