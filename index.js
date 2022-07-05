
var axios = require('axios');

const YourName = "TJ";

this.boss = 'Luke';

console.log('===== STARTING APPLICATION =====')

setTimeout(() => {
    console.log('Dont forget. ' + this.boss + ' is the BOSS');
}, 500);

employees = ["Alexia", "Valerie", "George", "Amanda", "TJ"]

console.log('Current Employees:');
for (var i = 0; i < employees.length; i += 1) {
    if (isMe(employees[i])) {
        console.log(employees[i] + ' - Hey.. Its you!');
    }
    else {
        console.log(employees[i]);
    }
}

console.log('getting data from API');

axios.get('https://jsonplaceholder.typicode.com/posts').then((postsResponse) => {
    posts = postsResponse.data;

    if (posts[0].id == 1) {
        console.log('Post 1, lets get the comments');
        axios.get('https://jsonplaceholder.typicode.com/posts/1/comments').then((commentsResponse) => {
                printAllComments(commentsResponse.data);
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
