export function validateCnpj(cnpj: string): boolean {
    // Remove any punctuation or spaces from the input
    cnpj = cnpj.replace(/[^\d]/g, "");
  
    // Check that the CNPJ is the right length
    if (cnpj.length !== 14) {
      return false;
    }
  
    // Check for invalid CNPJ numbers
    if (
      cnpj === "00000000000000" ||
      cnpj === "11111111111111" ||
      cnpj === "22222222222222" ||
      cnpj === "33333333333333" ||
      cnpj === "44444444444444" ||
      cnpj === "55555555555555" ||
      cnpj === "66666666666666" ||
      cnpj === "77777777777777" ||
      cnpj === "88888888888888" ||
      cnpj === "99999999999999"
    ) {
      return false;
    }
  
    // Calculate the first verifier digit
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 > 9) {
      digit1 = 0;
    }
  
    // Calculate the second verifier digit
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight = weight === 2 ? 9 : weight - 1;
    }
    let digit2 = 11 - (sum % 11);
    if (digit2 > 9) {
      digit2 = 0;
    }
  
    // Check that the verifier digits match
    if (cnpj.substring(12) === digit1.toString() + digit2.toString()) {
      return true;
    } else {
      return false;
    }
  }