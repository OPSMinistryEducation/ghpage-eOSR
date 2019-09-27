// import { Ministry } from "../ministry";
// import { SchoolBoard } from "../school-board"
// import { EncryptionService } from "../../services/encryption-service";
// import { IsomorhicGitService } from "../../../../../src/services/isomorphic-git.service";
// import { School } from "../school";
// import { Student } from "../student";

// let MINISTRY_NAME = "Ministry of Education"
// let MINISTRY_EMAIL = "ministry@edu.ontario.ca"

// const encryptionService = new EncryptionService();

// (async () => {

// 	await IsomorhicGitService.build(MINISTRY_NAME, MINISTRY_EMAIL, "Initialize master").then(isoGit => {
// 		const ministry = new Ministry(MINISTRY_NAME, encryptionService, isoGit)
// 		const tdsb = new SchoolBoard("tdsb", ministry, encryptionService, isoGit)

// 		const school1 = new School("school", tdsb, encryptionService, isoGit)
// 		const bob = new Student("bob", school1, encryptionService, isoGit)

// 		isoGit.checkout("master").then(x => {
// 			isoGit.listBranches()
// 			isoGit.log(10, "master")
// 			isoGit.log(10, "tdsb")

// 			let request = ministry.sendRequest("Hello", tdsb)
// 			let request2 = ministry.sendRequest("Hi", tdsb)
	
// 			console.log(tdsb.verifyRequest(request.bytes, request.signature, ministry)) //true
// 			console.log(tdsb.verifyRequest(request.bytes, request2.signature, ministry)) //false, signature msimatch
// 			console.log(tdsb.verifyRequest(request2.bytes, request.signature, ministry)) //false, bytes mismatch

// 			let request3 = tdsb.sendRequest(request.bytes.toString() + " received", ministry)
// 			console.log(ministry.verifyRequest(request3.bytes, request3.signature, tdsb)) //true
// 			console.log(tdsb.verifyRequest(request3.bytes, request3.signature, tdsb)) //false, sender cannot verify own request
// 			console.log(tdsb.verifyRequest(request3.bytes, request3.signature, tdsb)) //fasle, sender receiver inverted
		
// 			let request4 = bob.sendRequest("Enroll in CSC101", school1)
// 			console.log(school1.verifyRequest(request4.bytes, request4.signature, bob)) //true

// 			ministry.removeSchoolBoard(tdsb)
// 			console.log(ministry.verifyRequest(request3.bytes, request3.signature, tdsb)) //false, tdsb removed and no longer part of ministry schoolboards

// 		})
// 	})

// })().catch(err=>console.log(err))