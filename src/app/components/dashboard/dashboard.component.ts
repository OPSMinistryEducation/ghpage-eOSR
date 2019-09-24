import { Component, OnInit } from '@angular/core';
import { IsomorhicGitService } from 'src/app/services/isomorphic-git.service';
import { EncryptionService } from 'src/app/services/encryption.service';
import * as git from 'isomorphic-git';
import { Ministry } from 'src/app/entities/ministry';
import { Entity } from 'src/app/entities/Entity';
import { EntityTree } from 'src/app/models/EntityTree.model';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
	branches = [];
	commits: git.CommitDescriptionWithOid[] = [];

	curBranch = "master"
	loading = true;

	treeStructure: EntityTree; //raw JSON object
	treeString: string; //parsed tree in string representation
	ministry: Ministry | undefined
	//maps branch name to Entity and corresponding JSON object for O(1) access
	private branchEntityMap: { [key: string]: [Entity, EntityTree] } = {}
	setupComplete: Promise<any> | undefined;

	childType: string = "schoolboard"

	constructor(
		private readonly isomorphicGitService: IsomorhicGitService,
		private readonly encryptionService: EncryptionService,
	) {
	}

	ngOnInit() {
		this.ministry = new Ministry("Ontario Ministry of Education", this.encryptionService, this.isomorphicGitService)// Root node of Entities-node tree
		this.setupComplete = this.setUp()
		this.setupComplete.then(x => {
			// breadth first search JSON object tree
			this.treeString = this.BFS(this.treeStructure, this.ministry)[1]
			console.log(this.ministry.childEntities)
			console.log(this.treeString)
		})
	}

	setCurBranch(branch: string) {
		this.curBranch = branch
		console.log(this.curBranch)
		console.log(this.branchEntityMap[this.curBranch])
		switch (this.branchEntityMap[this.curBranch][1].type) {
			case "ministry":
				this.childType = "schoolboard"
				break;
			case "school-board":
				this.childType = "school"
				break;
			case "school":
				this.childType = "student"
				break;
		}
	}

	private BFS(root: EntityTree, entity: Entity | undefined, output = "", indent = 0): [Entity, string] {
		console.log(root)
		output = root.name
		let node = entity
		if (!node)
			node = new Entity(root.name, this.encryptionService, this.isomorphicGitService);
		this.branchEntityMap[node.name] = [node, root]
		console.log(node.name)
		if (root.children) {
			indent += 1
			root.children.forEach(child => {
				let [childEntity, treeString] = this.BFS(child, undefined, output, indent)
				node.childEntities.push(childEntity)
				output += "\n" + "    ".repeat(indent) + " |--> " + treeString

			});
		}
		return [node, output]
	}

	async setUp(): Promise<any> {
		await this.isomorphicGitService.build(this.isomorphicGitService.GIT_TOKEN)

		let branch = await git.currentBranch({ dir: '/', fullname: false })
		console.log("Current branch:", branch)

		await git.listBranches({ dir: '/', remote: 'origin' }).then(x => this.branches = x)

		// await Promise.all(this.branches.map(async (branch) => {
		// 	await git.checkout({ dir: '/', ref: branch })
		// }))

		let sha = await git.resolveRef({ dir: '/', ref: branch })

		// read file hierarchy.json
		let promise = git.readObject({
			dir: '/',
			oid: sha,
			filepath: 'hierarchy.json',
			encoding: 'utf8'
		})
		let { object: blob } = await promise
		this.treeStructure = JSON.parse(blob.toString())

		console.log("set up completed")

		this.loading = false


	}

	async selectBranch(branch: string): Promise<any> {
		await this.setupComplete;
		this.loading = true;
		// set current branch
		this.curBranch = branch

		if (this.branchEntityMap[branch])
			switch (this.branchEntityMap[branch][1].type) {
				case "ministry":
					this.childType = "schoolboard"
					break;
				case "school-board":
					this.childType = "school"
					break;
				case "school":
					this.childType = "student"
					break;
			}

		// set child branch type
		if (branch == "master")
			branch = "Ontario Ministry of Education"

		// checkout the master branch
		// await git.checkout({ dir: '/', ref: branch })
		this.commits = await git.log({ dir: '/', depth: 5, ref: this.curBranch })
		this.loading = false

		return this.commits
	}

	async sendRequest(): Promise<any> {
		this.loading = true;
		await this.setupComplete
		console.log("requst sent")
		console.log(this.curBranch)

		let sha = await git.resolveRef({ dir: '/', ref: this.curBranch })
		console.log(sha)
		let { object: blob } = await git.readObject({
			dir: '/',
			oid: sha,
			filepath: 'properties.json',
			encoding: 'utf8'
		})
		let properties = JSON.parse(blob.toString())
		console.log(properties)
		let parentBranchName = properties.parent

		console.log(parentBranchName)

		await git.checkout({ dir: '/', ref: parentBranchName })

		sha = await git.commit({
			dir: '/',
			author: {
				name: this.curBranch,
				email: this.curBranch + "@mail.com"
			},
			message: 'Request sent from ' + this.curBranch + " on " + new Date()
		})

		let promise = git.push({
			dir: '/',
			force: true,
			remote: 'origin',
			ref: 'master',
			token: this.isomorphicGitService.GIT_TOKEN
		})
		let pushResponse = await promise
		console.log(pushResponse)
		// await git.checkout({ dir: '/', ref: this.curBranch })
		console.log("done")
		this.loading = false
		return promise
	}

	async acceptRequest(commit: git.CommitDescriptionWithOid): Promise<any> {
		this.loading = true;

		console.log("checking out branch: ", commit.author.name)
		let co = await git.checkout({ dir: '/', ref: commit.author.name })

		await git.commit({
			dir: '/',
			author: {
				name: this.curBranch,
				email: this.curBranch + "@mail.com"
			},
			message: 'Request accepted by ' + this.curBranch + " => Original Rquest: " + commit.oid + " " + commit.message
		})

		let promise = git.push({
			dir: '/',
			remote: 'origin',
			ref: this.curBranch,
			token: this.isomorphicGitService.GIT_TOKEN,
			force: true
		})
		let pushResponse = await promise

		console.log(pushResponse)
		// await git.checkout({ dir: '/', ref: this.curBranch })

		console.log("done")
		this.loading = false
		return promise
	}

	checkout() {
		console.log("checkout")
	}

	newChildBranch(name: string) {
		let child: Entity = new Entity(name, this.encryptionService, this.isomorphicGitService)
		let branch: string = this.curBranch == "master" ? "Ontario Ministry of Education" : this.curBranch
		console.log(branch)

		let [entity, parentNode]: [Entity, EntityTree] = this.branchEntityMap[branch]
		let parent: Entity = entity
		console.log(parentNode.name)
		// parent.addChildEntity(child, parentNode, this.childType)
	}

	private parseBranchName(branch: string): string {
		return (branch == "Ontario Ministry of Education") ? "master" : branch
	}
}