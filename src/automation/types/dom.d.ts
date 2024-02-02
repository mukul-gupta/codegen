declare module 'DOMNS' {
	export type ElementType =
		| 'input'
		| 'select'
		| 'checkbox'
		| 'button'
		| 'anchor'
		| 'label';

	export interface PageElement {
		// meta data for a DOM element
		type: ElementType;

		// maybe all optional
		path:string?;
		css_locator:string?;
		name: string?;
		id: string?;
		label: PageElement?;
		value_string:string?;
		value_boolean: boolean?;
	}
}
