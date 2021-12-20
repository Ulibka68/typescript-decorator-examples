// https://developer.mozilla.org/ru/docs/Web/JavaScript/Guide/Details_of_the_Object_Model#%D1%82%D0%BE%D0%BD%D0%BA%D0%BE%D1%81%D1%82%D0%B8_%D0%BD%D0%B0%D1%81%D0%BB%D0%B5%D0%B4%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_%D1%81%D0%B2%D0%BE%D0%B9%D1%81%D1%82%D0%B2

/**
 *
 * @param name
 * @param dept
 * @param projects - Array[string]
 * @constructor
 */
function WorkerBee(name, dept, projects) {
  this.name = name;
  this.dept = dept;
  this.projects = projects || [];
}

WorkerBee.prototype = Employee;

function Engineer(name, projs, mach) {
  this.base = WorkerBee;
  this.base(name, 'engineering', projs);
  this.machine = mach || '';
}

Engineer.prototype = new WorkerBee;



function Employee() {
  this.name = '';
  this.dept = 'general';
};
Employee.prototype.specialty = "none";


var mark = new WorkerBee('', 'general', []);
mark.name = 'Doe, Mark';
mark.dept = 'admin';
mark.projects = ['navigator'];
mark.bonus = 3000;

var jane = new Engineer('Doe, Jane', ['navigator', 'javascript'], 'belau');

