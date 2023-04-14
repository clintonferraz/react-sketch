export function validateCpf(cpf: string): boolean {
    // Remove any punctuation or spaces from the input
    cpf = cpf.replace(/[^\d]/g, "");

    // Check that the CPF is the right length
    if (cpf.length !== 11) {
        return false;
    }

    // Check for invalid CPF numbers
    if (
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999"
    ) {
        return false;
    }

    // Calculate the first verifier digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 > 9) {
        digit1 = 0;
    }

    // Calculate the second verifier digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    let digit2 = 11 - (sum % 11);
    if (digit2 > 9) {
        digit2 = 0;
    }

    // Check that the verifier digits match
    if (cpf.substring(9) === digit1.toString() + digit2.toString()) {
        return true;
    } else {
        return false;
    }
}
