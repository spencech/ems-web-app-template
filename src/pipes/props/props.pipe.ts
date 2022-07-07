import { Injectable, Pipe, PipeTransform } from '@angular/core';
/*
  Filters a list using comparison operators.
  e.g., 
  <div *ngFor="let item of items:props:'id':'>=':3">{{ item.label }}</div>
  Also supports dot notation for nesting
  e.g.,
  <div *ngFor="let item of items:props:'info.value':'>=':3">{{ item.label }}</div>
*/
@Pipe({
  name: 'props',
  pure: false
})
@Injectable()
export class PropsPipe implements PipeTransform {
  transform(content: any[], property: string, operator: string,  comparisonProperty: any): any[] {
  	const output = [] as any[];

  	content.forEach(item => {

      const props = property.split(".");
      let value = item, comparison = item;
      props.forEach((p:any) => value = value[p]);
      comparison = comparisonProperty;

  		switch(operator) {
  			case "=":
  			case "==":
  			case "===":
  				if(value === comparison) output.push(item);
  			break;
  			case ">":
  				if(value > comparison) output.push(item);
  			break;
  			case ">=":
  				if(value >= comparison) output.push(item);
  			break;
  			case "<":
  				if(value < comparison) output.push(item);
  			break;
  			case "<=":
  				if(value <= comparison) output.push(item);
  			break;
        case "!=":
        case "!==":
          if(value !== comparison) output.push(item);
        break;
  			default:
  		}
  	});
  	return output;
  }
}
