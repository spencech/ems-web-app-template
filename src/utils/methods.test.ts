import * as _ from "underscore";
import { delay } from "ems-web-app-utils";

export function expectInterfaceForObject(objectInterface: string[], object: any ) {
	_.each(objectInterface, prop => {
		const property = prop.replace(/[\?!]$/,"");
		const conditional = prop.match(/\?$/);
		if(conditional && object[property] === undefined) return;
		else expect(object[property]).toBeDefined(`required "${prop}" key from interface does not exist on object`);
	});
}

export function expectStrictInterfaceForObject(objectInterface: string[], object: any ) {
	_.each(objectInterface, prop => {
		const property = prop.replace(/[\?!]$/,"");
		const conditional = prop.match(/\?$/);
		if(conditional && object[property] === undefined) return;
		else expect(object[property]).toBeDefined(`required "${prop}" key from interface does not exist on object`);
	});

	_.each(object, (v,k) => {
		if(k.match(/^_/)) return;
		const objInterface = objectInterface.map(p => p.replace(/[\?!]$/,""));
		const conditional = _.contains(objectInterface, `${k}?`);
		
		expect(objInterface.indexOf(k)).toBeGreaterThan(-1,`"${k}" key on object does not exist in interface `);
		if(conditional && object[k] === undefined) return;
		expect(v).toBeDefined(`"${k}" key is undefined`);
	});
}

export function mockAwsApiGateway(response: any): any {
    //@ts-ignore
   	return { invokeApi: jasmine.createSpy().and.callFake((path: any , segment: string, method: string, params:any , body: any) => {
      return new Promise((resolve: (result: any) => void, reject: (result: any) => void) => {
        delay(() => resolve({data: response}));
      })
    })};
}
