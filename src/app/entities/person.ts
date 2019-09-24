// import { Entity, Request } from "./Entity";
// import { EncryptionService } from "../services/encryption-service";
// import { IsomorhicGitService } from "../../../../src/services/isomorphic-git.service";
// import { School } from "./school";
// import { Course } from "./course";

// export abstract class Person extends Entity{
// 	constructor(
// 		readonly name: string,
// 		readonly school: School,
// 		readonly encryptionService: EncryptionService,
// 		readonly isomorphicGitService: IsomorhicGitService
// 	) { 
// 		super(name, encryptionService, isomorphicGitService)
// 	}	

// 	courses = new Array<Course>()

// 	requestAddCourse(course: Course){
// 		if (this.school.courses.includes(course)){
// 			return this.sendRequest("Enrol requst: " + course.name, this.school)
// 		}
// 		return null
// 	}

// 	confirmAddCourse(course: Course, confirmation: Request){
// 		console.log(this.encryptionService.encodeUTF8(confirmation.bytes))
// 		this.courses.push(course)
		
// 	}
// }
