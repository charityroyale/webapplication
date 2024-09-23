const dateFormatter = Intl.DateTimeFormat('de-AT', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
export function formatDate(date: Date) {
	return dateFormatter.format(date)
}

export function formatMoney(amount: string | number, ignoreCents: boolean = false) {
	const parsed = parseFloat(`${amount}`)
	if (isNaN(parsed)) {
		return '0,00'
	}
	return (ignoreCents ? parsed : parsed / 100).toLocaleString('de-DE', { minimumFractionDigits: 2 })
}

export function formatMoneyWithSign(amount: string | number, ignoreCents: boolean = false) {
	return `${formatMoney(amount, ignoreCents)}€`
}
