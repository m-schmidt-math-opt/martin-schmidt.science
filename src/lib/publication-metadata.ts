import type { PublicationMetadataItem, PublicationType } from './publications';

export interface PublicationMetadataFields {
	volume?: string;
	number?: string;
	pages?: string;
	publisher?: string;
	series?: string;
	edition?: string;
	reportType?: string;
}

export function createPublicationMetadata(
	type: PublicationType,
	primaryVenue: string | undefined,
	fields: PublicationMetadataFields,
): PublicationMetadataItem[] {
	const metadata: PublicationMetadataItem[] = [];
	const add = (label: string, value?: string) => {
		if (value?.trim() && value !== primaryVenue) metadata.push({ label: `${label}${value}` });
	};

	if (type === 'journal') {
		add('Vol. ', fields.volume);
		add('No. ', fields.number);
		add('pp. ', fields.pages);
	} else if (type === 'conference' || type === 'chapter') {
		add('pp. ', fields.pages);
		add('', fields.publisher);
	} else if (type === 'book') {
		add('Series: ', fields.series);
		add('Edition: ', fields.edition);
	} else if (type === 'preprint' || type === 'thesis') {
		add('', fields.reportType);
		if (type === 'preprint') add('No. ', fields.number);
	}

	return metadata;
}
