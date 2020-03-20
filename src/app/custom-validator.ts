import { FormGroup } from '@angular/forms';

export function confirmPassword(formGroup: FormGroup): { [s: string]: boolean } | null{
    const password = formGroup.get('password');
    const cPassword = formGroup.get('cPassword');
    if(password.value !== cPassword.value){
        return {'miss match': true};
    }else{
        return null;
    }
}