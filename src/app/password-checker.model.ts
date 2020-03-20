import { PasswordStatus } from './password-status.model';

export  class PasswordChecker {

    static getPasswordStatus(password: string): PasswordStatus {
      let passwordColors = {'Poor': 'darkred', 'Weak': 'red', 'Good': 'orangered', 'Very Good': 'orange', 'Perfect': 'Green'};
        let passwordStrenght = '';
        const regex = /[$-/:-?{-~!"^_@`\[\]][$-/:-?{-~!"^_@`\[\]]/g;
        const lowerLetters = /[a-z][a-z]+/;
        const upperLetters = /[A-Z][A-Z]+/;
        const numbers = /[0-9][0-9]+/;
        const symbols = regex;
        let passStr: number = 0;
        if (lowerLetters.test(password)) {
          passStr += 1;
        }
        if (upperLetters.test(password)) {
          passStr += 1;
        }
        if (numbers.test(password)) {
          passStr += 1;
        }
        if (symbols.test(password)) {
          passStr += 1;
        }
    
        if (password.length < 6) {
          passwordStrenght = 'Poor';
          return new PasswordStatus(passwordStrenght, passwordColors[passwordStrenght]);
        }
    
        if (password.length >= 10) {
          switch (passStr) {
            case 1:
              passwordStrenght = 'Weak';
              break;
            case 2:
              passwordStrenght = 'Good';
              break;
            case 3:
              passwordStrenght = 'Very Good';
              break;
            case 4:
              passwordStrenght = 'Perfect';
              break;
          }
          return new PasswordStatus(passwordStrenght, passwordColors[passwordStrenght]);
        }
    
        if (password.length >= 8) {
          switch (passStr) {
            case 1:
              passwordStrenght = 'Weak';
              break;
            case 2:
              passwordStrenght = 'Good';
              break;
            case 3:
              passwordStrenght = 'Very Good';
              break;
            case 4:
              passwordStrenght = 'Very Good';
              break;
          }
          return new PasswordStatus(passwordStrenght, passwordColors[passwordStrenght]);
        }
    
        if (password.length >= 6) {
          switch (passStr) {
            case 1:
              passwordStrenght = 'Weak';
              break;
            case 2:
              passwordStrenght = 'Weak';
              break;
            case 3:
              passwordStrenght = 'Good';
              break;
            case 4:
              passwordStrenght = 'Good';
              break;
          }
          return new PasswordStatus(passwordStrenght, passwordColors[passwordStrenght]);
        }
      }
    
}