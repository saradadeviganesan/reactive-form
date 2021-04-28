import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Hobby } from './models/hobby.model';

export function MatchValidator(ctrl:string, list: Hobby[]) : any{
    return (formGroup: FormGroup) => {
        const control = formGroup.controls['name'];
        
        if(control.errors){
            return;
        }
        const match = list?.filter(obj =>  obj.name?.toLowerCase() === control.value?.toLowerCase());

        if(match?.length)
            control.setErrors({isDuplicate: true});
        else
            control.setErrors(null);
    }
}
