import { sign } from "tweetnacl"
import { decodeUTF8, encodeUTF8 } from "tweetnacl-util";
import { encode } from "punycode";
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class EncryptionService {
	constructor() {
	}

	generateKeys(): nacl.SignKeyPair {
		return sign.keyPair()
	}

	generateSignature(message: string, privateKey: Uint8Array): Uint8Array {
		const bytes = decodeUTF8(message);
		const signature = sign.detached(bytes, privateKey);
		return signature
	}

	verifySignature(bytes: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): boolean {
		return sign.detached.verify(bytes, signature, publicKey)
	}

	decodeUTF8(message: string): Uint8Array {
		return decodeUTF8(message)
	}

	encodeUTF8(bytes: Uint8Array) {
		return encodeUTF8(bytes)
	}

	/**Ceasar cipher */
	caesarEncrypt(text, shift) {
		var result = "";
		//loop through each caharacter in the text
		for (var i = 0; i < text.length; i++) {
			//get the character code of each letter
			var c = text.charCodeAt(i);
			// handle uppercase letters
			if (c >= 65 && c <= 90) {
				result += String.fromCharCode((c - 65 + shift) % 26 + 65);
				// handle lowercase letters
			} else if (c >= 97 && c <= 122) {
				result += String.fromCharCode((c - 97 + shift) % 26 + 97);
				// its not a letter, let it through
			} else {
				result += text.charAt(i);
			}
		}
		return result;
	}

	ceasarDecrypt(text, shift) {
		var result = "";
		shift = (26 - shift) % 26;
		result = this.caesarEncrypt(text, shift);
		return result;
	}
}

class Identity {
	public constructor(
		public publicKey: Uint8Array | null,
		private secretKey: Uint8Array | null
	) { }
}