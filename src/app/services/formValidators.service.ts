import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

interface ValidatorFn {
  (c: AbstractControl): ValidationErrors | null
}

export function birthDateCheck(brthdat: AbstractControl) {
  if (brthdat.value) {
    // console.log("Control value: ", brthdat);
  }

  return { check: false };
}

// export function calculateAgeTrigger(control: AbstractControl) {
//   if (control && (control.value !== null) && (control.value !== undefined)) {
//     if (control.root && control.root.get('IT.ICF1DAT').value && control.root.get("IT.BRTHDAT").value) {
//       let icf1dat = new Date(control.root.get('IT.ICF1DAT').value);
//       let brthdat = new Date(control.root.get("IT.BRTHDAT").value);

//       control.root.get('IT.AGE').setValue(Math.floor(Math.abs(icf1dat.getTime() - brthdat.getTime()) / (1000 * 3600 * 24 * 365)));
//       console.log(control.root.get('IT.AGE').value);
//     }
//   }

// }

export function raceOthersSpecifyCheck(formGroup: FormGroup) {
  let race = formGroup.get('IT.RACE').value;
  if (race.includes['OTHER']) {
    return { check: true };
  }
  return null;
}