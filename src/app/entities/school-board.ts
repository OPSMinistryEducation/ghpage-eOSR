// import { Ministry } from "./ministry";
// import { School } from "./school";
// import { Entity } from "./Entity";
// import { EncryptionService } from "../services/encryption-service";
// import { IsomorhicGitService } from "../../../../src/services/isomorphic-git.service";
// export class SchoolBoard extends Entity{
// 	constructor(
// 		readonly name: string,
// 		readonly ministry: Ministry,
// 		readonly encryptionService: EncryptionService,
// 		readonly isomorphicGitService: IsomorhicGitService,
// 	) {
// 		super(name, encryptionService, isomorphicGitService)
// 		ministry.addSchoolBoard(this)
// 	}
// 	schools = new Array<School>()

// 	async addSchool(school: School): Promise<any>{
// 		this.schools.push(school)
// 		return super.addChildEntity(school)
// 	}

// 	async removeSchool(school: School): Promise<any>{
// 		this.schools = this.schools.filter(x=>x!==school)
// 		return super.removeChildEntity(school)
// 	}

// 	verifyRequest(bytes: Uint8Array, signature: Uint8Array, sender: Entity): boolean {
// 		return super.verifyRequest(bytes, signature, sender, this.schools)
// 	}
// }	