
import { Entity } from "./Entity"
import { EncryptionService } from '../services/encryption.service';
import { IsomorhicGitService } from '../services/isomorphic-git.service';

export class Ministry extends Entity {
	constructor(
		readonly name: string,
		readonly encryptionService: EncryptionService,
		readonly isomorphicGitService: IsomorhicGitService
	) {
		super(name, encryptionService, isomorphicGitService)
	}
	// schoolBoards = new Array<SchoolBoard>()

	// async addSchoolBoard(schoolBoard: SchoolBoard): Promise<any> {
	// 	this.schoolBoards.push(schoolBoard)
	// 	return super.addChildEntity(schoolBoard, "master")
	// }

	// async removeSchoolBoard(schoolBoard: SchoolBoard): Promise<any> {
	// 	this.schoolBoards = this.schoolBoards.filter(x => x.name !== schoolBoard.name)
	// 	return super.removeChildEntity(schoolBoard, "master")
	// }

	// verifyRequest(bytes: Uint8Array, signature: Uint8Array, sender: Entity): boolean {
	// 	return super.verifyRequest(bytes, signature, sender, this.schoolBoards)
	// }

}