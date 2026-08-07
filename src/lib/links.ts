export function externalLinkAttributes(href: string) {
	return /^https?:\/\//i.test(href)
		? { target: '_blank' as const, rel: 'noopener noreferrer' }
		: {};
}
