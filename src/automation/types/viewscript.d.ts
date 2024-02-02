declare module "ViewScriptNS" {

	import {PageElement,ElementType} from 'DOMNS'

	export type Action = 'insert' | 'update' | 'clear' | 'click' | ' select' | 'unselect'

    export interface ViewScript {
		name:string; // name of view
		steps: Step[];
	}

    export interface Step {
		step_id:string; // uniquestepid
        pageElement: PageElement;
		action: Action;


    }
}

