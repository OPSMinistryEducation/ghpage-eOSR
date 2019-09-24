import { Injectable } from '@angular/core';
// import * as browserfs from 'browserfs';
const browserfs = require('browserfs')
// import * as browserfs from 'browserfs'
import * as git from 'isomorphic-git'
import { decodeUTF8 } from 'tweetnacl-util';
//const FS = require('@isomorphic-git/lightning-fs')
// import * as fs from "fs"
import { promise } from 'protractor';

import FS from '@isomorphic-git/lightning-fs';

const fs = new FS("testfs")

@Injectable({
	providedIn: 'root'
})
/** IsmorphicGitService.build() to instantiate service.*/
export class IsomorhicGitService {
	
	
	public readonly ENCRYPTED_TOKEN = 'MWQzMjg2ZTQzYTZmYmNlMzUyMGYyMDg3Mzc3ODRkOTQ5NWUwOTRlNQ=='
 	public readonly GIT_TOKEN = atob(this.ENCRYPTED_TOKEN)

	private readonly REPO_URL = "https://github.com/OPSMinistryEducation/eOSR-Blockchain";
	private readonly CORS_PROXY = "https://cors.isomorphic-git.org";
	// /** Builder for async instantiation */
	// public static build(ownerName: string, ownerEmail: string, initMessage: string) {
	// 	const isoGit = new IsomorhicGitService()
	// 	return isoGit.init()
	// 		.then(function () {
	// 			return isoGit.commit(ownerName, ownerEmail, initMessage).then(function () {
	// 				return isoGit
	// 			})
	// 		});
	// }
	public readonly git = git;
	public readonly fs = fs;

	initialized: boolean = false

	constructor() {
		// Initialize local filesystem
		browserfs.configure(
			{ fs: "InMemory", options: {} },
			function (err: any) {
				if (err)
					return console.log(err);
				git.plugins.set('fs', fs);
			})
	}

	async build(gitToken: string): Promise<any> {
		if (!this.initialized) {
			const newLocal = {
				dir: '/',
				corsProxy: this.CORS_PROXY,
				url: this.REPO_URL,
				ref: 'master',
				singleBranch: false,
				depth: 10,
				token: gitToken
			};
			let promise = await git.clone(newLocal).catch(err => console.log(err))
			this.initialized = true
			return promise
		}
		return Promise.resolve()
	}

	/** Generic promise handler */
	private async resolvePromise<T>(promise: Promise<T>): Promise<T> {
		try {
			return await promise
		}
		catch (error) {
			console.log(error)
			return Promise.reject()
		}
	}

	/** Write data stream to a file in designated branch */
	public async fileWriteAndCommit(file: string, data: string, branch:string, overWrite=false): Promise<any> {
		
		await git.checkout({ dir: '/', ref: branch })
		if (! overWrite){
			await fs.appendFile(file, data, function (err) {
				if (err) throw err;
				console.log(data + ' was appended to ' + file);
			});
		}
		else{
			await fs.writeFile(file, data, function (err) {
				if (err) throw err;
				console.log(data + ' was writtten to ' + file);
			});
		}

		await git.add({ dir: '/', filepath: file })
		await git.commit({
			dir: '/',
			author: {
			  name: branch,
			  email: branch + "@ontario.ca"
			},
			message: 'Update ' + file
		  })
		await git.push({
			dir: '/',
			remote: 'origin',
			ref: branch,
			token: this.GIT_TOKEN,
			force: true
		}).catch(err => console.log(err))
		console.log("done")
		return Promise.resolve()
	}

	/** Initialize git repository */
	private init() {
		return this.resolvePromise(git.init({ dir: "/" }))
	}

	/** Git new file to Git index for staging */
	add(filePath: string) {
		return this.resolvePromise(git.add({ dir: '/', filepath: filePath }))
	}

	/** Commit local changes*/
	commit(name: string, email: string, message: string): Promise<any> {
		return this.resolvePromise(git.commit({
			dir: '/',
			author: {
				name: name,
				email: email
			},
			message: message,
		}))
	}

	push(): Promise<any> {
		return this.resolvePromise(
			git.push({
				dir: '/',
				remote: 'origin',
				ref: 'master',
				token: process.env.GITHUB_TOKEN,
			}))
	}

	/** Get all commit history */
	log(depth: number, branch: string): void {
		this.resolvePromise(git.log({ dir: '/', depth: depth, ref: branch }))
			.then(x => console.log(x))
			.catch(err => console.log(err))
	}

	/** create new bracnh */
	branch(name: string): Promise<any> {
		return this.resolvePromise(git.branch({ dir: '/', ref: name }))
	}

	deleteBranch(name: string): Promise<any> {
		return this.resolvePromise(git.deleteBranch({ dir: '/', ref: name }))
	}

	/** list all local and remote branches */
	listBranches(): void {
		this.resolvePromise(git.listBranches({ dir: '/' })).then(x => console.log("Local: ", x))
		this.resolvePromise(git.listBranches({ dir: '/', remote: 'origin' })).then(x => console.log("Remote: ", x))
	}

	/** get current branch name */
	currentBranch(): void {
		let branch = this.resolvePromise(git.currentBranch({ dir: '/', fullname: false }))
		branch.then(x => console.log(branch))
			.catch(err => console.log(err))
	}

	/** checkout new branch */
	checkout(branch: string): Promise<any> {
		return this.resolvePromise(git.checkout({ dir: '/', ref: branch }))
	}

	// pull(): Promise<any> {
	// 	return this.resolvePromise(git.pull())
	// }

	/** Clone a remote git repository */
	clone(repoUrl: string) {
		// Make temporary directory
		return this.resolvePromise(git.clone({

			dir: '/',
			url: repoUrl,
			ref: 'master',
			singleBranch: true,
			depth: 10
		}))
	}
}



// --------------------TEST---------------------------
// ES6 euivalent of Python's if __name__ == "__main__"

// let isoGit = IsomorhicGitService.build("Ministry of education", "OPS@EDU.ca", "Ministry instantiated");
// isoGit.then(isoGit => {

// (async () => {
// 	// //test branching from master
// 	// await Promise.all([isoGit.branch("TDSB"), isoGit.branch("WDSB")])
// 	// isoGit.listBranches()

// 	// //test hierarchical branching
// 	// await isoGit.checkout('TDSB')
// 	// await isoGit.commit("TDSB", "TDSB@ontario.ca", "TDSB school board instantiated")
// 	// await Promise.all([isoGit.branch("school-1"), isoGit.branch("school-2")])
// 	// 	.catch(err => console.log(err))

// 	// await isoGit.checkout('WDSB')
// 	// await isoGit.commit("WDSB", "WDSB@ontario.ca", "WDSB school board instantiated").then(SHA => console.log("SHA: ", SHA))
// 	// await Promise.all([isoGit.branch("school-3")])
// 	// 	.catch(err => console.log(err))
// 	// isoGit.listBranches()

// 	// await isoGit.checkout("school-1")
// 	// await isoGit.currentBranch()

// 	// // Should be branched under TDSB, therefore log commits unique to TDSB
// 	// await isoGit.log(5, "school-1")

// 	// // Should be branched under TDSB, therefore log commits unique to TDSB
// 	// await isoGit.log(5, "school-2")

// 	// // Should be branched under WDSB, therefore log commits unique to WDSB
// 	// await isoGit.log(1, "school-3")

// 	// await isoGit.log(5, "master")

// 	// console.log("cloning")
// 	// Initialize file system
// 	// browserfs.configure(
// 	// 	{ fs: "InMemory", options: {} },
// 	// 	function (err: any) {
// 	// 		if (err)
// 	// 			return console.log(err);
// 	// 		const fs = browserfs.BFSRequire("fs");
// 	// 		git.plugins.set('fs', fs);
// 	// 	})
// 	// git.plugins.set('fs', fs);
// 	// Initialize file system
// 	// await browserfs.configure(
// 	// 	{ fs: "InMemory", options: {} },
// 	// 	function (err: any) {
// 	// 		if (err)
// 	// 			return console.log(err);
// 	// 		const fs = browserfs.BFSRequire("fs");
// 	// 		// fs.mkdir("/")
// 	// 		git.plugins.set('fs', fs);

// 	// 	})
// 	console.log("hello")



// 	// Initialize file system
// 	await browserfs.configure(
// 		{ fs: "InMemory", options: {} },
// 		function (err: any) {
// 			if (err)
// 				return console.log(err);

// 			git.plugins.set('fs', fs);
// 		})

// 	const newLocal = {
// 		dir: '/',
// 		corsProxy: 'https://cors.isomorphic-git.org',
// 		url: 'https://github.com/OPSMinistryEducation/eOSR-Blockchain',
// 		ref: 'master',
// 		singleBranch: false,
// 		depth: 10,
// 		token: 
// 	};
// 	await git.clone(newLocal);
// 	console.log('done')

// 	const author = {
// 		name: "s",
// 		email: "s@mail.com",
// 		date: Date(),
// 	}

// 	// await fs.appendFile('test.txt', 'data to append', function (err) {
// 	// 		if (err) throw err;
// 	// 		console.log('The "data to append" was appended to file!');
// 	// 	});
// 	// await fs.readFile('test.txt', function (err: Error, data: string) {
// 	// 	if (err) throw err;
// 	// 	console.log(data);
// 	// });
// 	// await git.add({ dir: '/', filepath: 'test.txt' })
// 	// await isoGit.commit("rw", "ryland.wang@ontario.ca", "hello world")
// 	// await git.push({
// 	// 	dir: '/',
// 	// 	remote: 'origin',
// 	// 	ref: 'master',
// 	// 	token: 
// 	// 	force: true
// 	// }).catch(err => console.log(err))
// 	// console.log("done")
// 	await git.listFiles({ dir: '/', ref: 'master' }).then(x => console.log(x))
// 	await git.listFiles({ dir: '/' }).then(x => console.log(x))
// 	// await 

// 	// await fs.readFile('test.txt', function (err: Error, data: string) {
// 	// 		if (err) throw err;
// 	// 		console.log(data);
// 	// 	});

// 	await git.log({ dir: '/', depth: 10 }).then(x => console.log(x))

// 	// checkout the master branch
// 	await git.checkout({ dir: '/', ref: 'TDSB' })
// 	// Get the current branch name
// 	let branch = await git.currentBranch({ dir: '/', fullname: false })
// 	console.log(branch)

// 	// Get the contents of 'README.md' in the master branch.
// 	let sha = await git.resolveRef({ dir: '/', ref: 'TDSB' })
// 	console.log(sha)
// 	let { object: blob } = await git.readObject({
// 		dir: '/',
// 		oid: sha,
// 		filepath: 'properties.json',
// 		encoding: 'utf8'
// 	})
// 	let properties = JSON.parse(blob.toString())

// 	// checkout the master branch
// 	await git.checkout({ dir: '/', ref: properties.parent })
// 	// Get the current branch name
// 	branch = await git.currentBranch({ dir: '/', fullname: false })
// 	console.log(branch)




// })();
// })