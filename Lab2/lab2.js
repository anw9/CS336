/* 
Arie Williams 
Sept. 12 2018 
Cs336 Lab2 */

//2.1
function Person(name, bDay, List){
	this.name = name;
	this.bDay = bDay;
	this.friendList = List;
}

Person.prototype.rename = function(newName) {
	this.name = newName;
};

Person.prototype.getAge = function(){
	var today = new Date();
	var birthDate = new Date(this.bDay);
	var age = today.getMonth() -birthDate.getMonth();
	var m = today.getFullYear() - birthDate.getFullYear();
	if (age < 0 || (age === 0 && today.getDate() < birthDate.getDate())) {
		m--;
	}
	return m;	 
}

Person.prototype.addFriend = function(newFriend){
this.friendList.push(newFriend);
}
Person.prototype.printMessage = function(){
	return "I'm a Person!!!";
}

//Implementaiton 2.1
var p1 = new Person("Megan", "1997/09/03", ["Arie", "Derek", "Lauren"]);
console.log(p1);
p1.rename("Megz");
console.log(p1);
console.log(p1.getAge());
p1.addFriend("Toussaint");
console.log(p1);
console.log(p1.printMessage());

//2.2
function Student(name, bDay, list, subject) {
	Person.call(this, name, bDay, list);
	this.subject = subject;
};
Student.prototype = Object.create(Person.prototype);
Student.prototype.printMessage = function() {
	return "I am a Student";
};

//Implement 2.2
var p2 = new Student("Arie", "1996/10/05", ["Megan, Tous, Derek"], "CS");
console.log(p2);
p2.rename("Adrianna");
console.log(p2);
console.log(p2.getAge());
p2.addFriend("Lauren");
console.log(p2);
console.log(p2.printMessage());



