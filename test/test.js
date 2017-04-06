var assert = require("assert"); // node.js core module

function showPreReq(department, courseNumber){
  if(prerequisites[department])
    return(prerequisites[department][courseNumber])
}



function getNameDep(courseObj){
	var department = courseObj.split(" ")[0];
  var courseNumber = courseObj.replace("-"," ").split(" ")[1];
	//console.log('deparment: ', department);
	//console.log('course number: ', courseNumber);
	return department
}

function getNameNum(courseObj){
  var department = courseObj.split(" ")[0];
	var courseNumber = courseObj.replace("-"," ").split(" ")[1];
	//console.log('deparment: ', department);
	//console.log('course number: ', courseNumber);
	return courseNumber
}

var prerequisites = {
  'CSCI': {
    '1300': 'None',
    '2700': 'Some'
  }
};


describe('getDep', function(){
  describe('#getDep()',  function(){
    it('should return department name', function(){
      assert.deepEqual('PSCI', getNameDep("PSCI 3074-001"));
    })
  })
});

describe('getNum', function(){
  describe('#getNum()',  function(){
    it('should return department name', function(){
      assert.deepEqual('3074', getNameNum("PSCI 3074-001"));
    })
  })
});

describe('showPreReq', function(){
  describe('#showPreReq()', function(){
    it('should return prerequisites', function(){
      assert.equal('None', showPreReq("CSCI", "1300"));
    })
  })
});
