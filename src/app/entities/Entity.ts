import { EncryptionService } from "src/app/services/encryption.service";
import { IsomorhicGitService } from "src/app/services/isomorphic-git.service";
import { EntityTree } from '../models/EntityTree.model';

export class Entity {
	public publicKey: Uint8Array;
	protected privateKey: Uint8Array;

	childEntities = new Array<Entity>()
	parentEntity: Entity | undefined;

	constructor(
		readonly name: string,
		readonly encryptionService: EncryptionService,
		readonly isomorphicGitService: IsomorhicGitService
	) {
		const identity = encryptionService.generateKeys()
		this.publicKey = identity.publicKey
		this.privateKey = identity.secretKey
	}

	async addChildEntity(child: Entity, entityTree: EntityTree, childType: string): Promise<any> {
		let branch = this.name=="Ontario Ministry of Education" ? "master" : this.name
		child.parentEntity = this
		this.childEntities.push(child)

		//create child branch and establish branch properties
		await this.isomorphicGitService.checkout(branch)
		await this.isomorphicGitService.branch(child.name)
		let childNode: EntityTree = {
			name: child.name,
			type: childType,
			children: []
		}
		await this.isomorphicGitService.fileWriteAndCommit("properties.json", JSON.stringify(childNode), child.name)
		
		//update master branch's branch hierarchy records
		await this.isomorphicGitService.checkout("master")
		entityTree.children.push(childNode)
		await this.isomorphicGitService.fileWriteAndCommit("properties.json", JSON.stringify(entityTree), entityTree.name)
		// await this.isomorphicGitService.commit(entityTree.name, entityTree.name + "@mail.com", "")
	}

	async removeChildEntity(child: Entity, name = this.name): Promise<any> {
		child.parentEntity = undefined
		this.childEntities.filter(x=>x.privateKey != child.privateKey)
		await this.isomorphicGitService.checkout(name)
		return this.isomorphicGitService.deleteBranch(child.name)
	}

	sendRequest(message: string, receiver: Entity): Request {
		let request: Request = {
			"bytes": this.encryptionService.decodeUTF8(message),
			"signature": this.encryptionService.generateSignature(message, this.privateKey)
		}
		return request
	}

	verifyRequest(bytes: Uint8Array, signature: Uint8Array, sender: Entity, childEntities = this.childEntities): boolean {
		return ((this.parentEntity != undefined && this.parentEntity == sender) || childEntities.includes(sender))
			&& (this.encryptionService.verifySignature(bytes, signature, sender.publicKey))
	}
 
}

export interface Request {
	bytes: Uint8Array,
	signature: Uint8Array,
}