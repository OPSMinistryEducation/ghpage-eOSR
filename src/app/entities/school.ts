// import { SchoolBoard } from "./school-board";
// import { Teacher } from "./teacher";
// import { Student } from "./student";
// import { Course } from "./course"
// import { Entity } from "./Entity";
// import { EncryptionService } from "../services/encryption-service";
// import { IsomorhicGitService } from "../../../../src/services/isomorphic-git.service";

// export class School extends Entity {
// 	constructor(
// 		readonly name: string,
// 		readonly schoolBoard: SchoolBoard,
// 		readonly encryptionSerivce: EncryptionService,
// 		readonly isomorphicGitService: IsomorhicGitService,
// 	) {
// 		super(name, encryptionSerivce, isomorphicGitService)
// 		schoolBoard.addSchool(this)
// 	}
// 	teachers = new Array<Teacher>();
// 	students = new Array<Student>();
// 	courses = new Array<Course>();

// 	async addStudent(student: Student): Promise<any> {
// 		this.students.push(student)
// 		return super.addChildEntity(student)
// 	}

// 	async removeStudent(student: Student): Promise<any> {
// 		this.students = this.students.filter(x => x !== student)
// 		return super.removeChildEntity(student)
// 	}

// 	async addTeacher(teacher: Teacher): Promise<any> {
// 		this.teachers.push(teacher)
// 		return super.addChildEntity(teacher)
// 	}

// 	async removeTeacher(teacher: Teacher): Promise<any> {
// 		this.teachers = this.teachers.filter(x => x !== teacher)
// 		return super.removeChildEntity(teacher)
// 	}

// 	async addCourse(course: Course): Promise<any> {
// 		this.courses.push(course)
// 		return super.addChildEntity(course)
// 	}
// 	async removeCourse(course: Course): Promise<any> {
// 		this.courses = this.courses.filter(x => x !== course)
// 		return super.removeChildEntity(course)
// 	}

// 	verifyRequest(bytes: Uint8Array, signature: Uint8Array, sender: Entity): boolean {
// 		return (sender instanceof Student ? super.verifyRequest(bytes, signature, sender, this.students)
// 			: sender instanceof Teacher ? super.verifyRequest(bytes, signature, sender, this.teachers)
// 				: sender instanceof Course ? super.verifyRequest(bytes, signature, sender, this.courses)
// 					: super.verifyRequest(bytes, signature, sender))
// 	}

// }