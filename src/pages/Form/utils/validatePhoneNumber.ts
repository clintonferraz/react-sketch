export function validatePhoneNumber(phoneNumber: string): boolean {
    // Remove any punctuation or spaces from the input
    phoneNumber = phoneNumber.replace(/[^\d]/g, "");
  
    // Check that the phone number is either 10 or 11 digits
    if (phoneNumber.length !== 10 && phoneNumber.length !== 11) {
      return false;
    }
  
    // Check that the phone number starts with a valid area code
    const areaCodes = ["11", "12", "13", "14", "15", "16", "17", "18", "19",
                       "21", "22", "24", "27", "28", "31", "32", "33", "34",
                       "35", "37", "38", "41", "42", "43", "44", "45", "46",
                       "47", "48", "49", "51", "53", "54", "55", "61", "62",
                       "63", "64", "65", "66", "67", "68", "69", "71", "73",
                       "74", "75", "77", "79", "81", "82", "83", "84", "85",
                       "86", "87", "88", "89", "91", "92", "93", "94", "95",
                       "96", "97", "98", "99"];
    if (!areaCodes.includes(phoneNumber.substring(0, 2))) {
      return false;
    }
  
    // If the phone number has 11 digits, check that it starts with "9"
    if (phoneNumber.length === 11 && phoneNumber.charAt(2) !== "9") {
      return false;
    }
  
    // All checks passed, the phone number is valid
    return true;
  }