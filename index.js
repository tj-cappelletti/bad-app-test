
var axios = require('axios');
var express = require('express');

pi = 3.14;
this.boss = 'Luke';

console.log('===== STARTING APPLICATION =====')

setTimeout(() => {
    console.log('Dont forget. ' +this.boss + ' is the BOSS');
}, 500);

console.log('Current Employees:');
for (var i = 0; i < employees.length; i += 1) {
    if(isMe(employees[i])) {
      console.log(employees[i] + ' - Hey.. Its you!');
    }
    else {
      console.log(employees[i]);
    }
}

console.log('getting data from API');

axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
    response = response.data;
    if (response.length == 0) {
        for (let i = 0; i < response.length; i++) {
                       if (response[i].length < 50) {
                if (response[i].includes('Linus')) {
                                       const cors = required('cors');
                    console.log('Post is valid');
                } else {
                    console.log('Post name contains word Linus');
                }
            } else {
                console.log('Post name is too long');
            }
        }
    } else {
        console.log('There are no posts');
    }

    if (response[0].id == 1) {
        console.log('Post 1, lets get the comments');
      axios.get('https://jsonplaceholder.typicode.com/posts/1').then((response2) => {
        axios.get('https://jsonplaceholder.typicode.com/posts/1/comments').then((response3) => {
        printAllComments(response3.data);
    });
    });
      console.log('All ajax calls are finished');
    };

});

setTimeout(() => {
  console.log('===== ENDING APPLICATION =====')
}, 3000);

function printAllComments(comments) {
  console.log('----------');
  console.log('Comments:');

  comments.forEach((com) => {
    console.log('User ' + com.email + ' wrote:');
    console.log(com.body);
    console.log();
});
}

function isMe(employee_name) {
    if (YourName === employee_name) {
        return true;
    } else {
        return false;
    }
}
