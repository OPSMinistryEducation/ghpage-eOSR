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

	verifySignature(bytes: Uint8Array, signature: Uint8Array, publicKey: Uint8Array): boolean{
		return sign.detached.verify(bytes, signature, publicKey)
	}

	decodeUTF8(message: string): Uint8Array {
		return decodeUTF8(message)
	}

	encodeUTF8(bytes: Uint8Array){
		return encodeUTF8(bytes)
	}
}

class Identity {
	public constructor(
		public publicKey: Uint8Array | null,
		private secretKey: Uint8Array | null
	) { }
}