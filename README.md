# Summary
To help explain my thought process and issues that I discovered while evaluating the provide script, I've created this `README.md` file to help you follow my thought process.
I start off by explaining my approach to solving this particular task at hand.
I then explain the fixes I've made and why I felt they were important.
Finally, I wrap up with next steps that I think would be important in this case.

Over the last few years that leveraging files such as this in, especially in cases of geo-distributed team, this can help to cut down confusion and a lot of potential unnecessary back and forth.
The approach you see in this file becomes the basis for performing pull requests.
I'm a huge proponent collaborating through pull requests, provided they are constructive and help others to grow and learn.

# Approach
In normal circumstances, I would have reached out and ask for deatils on the requirements and/or issues that occuring with this script.
Given the circumstances how this scenario, I simply opted to discover them for myself and let the code guide me.

When ever I’m given a piece of code like this, my first approach is simply to look over the file to see how well it has been constructed and if I can follow it.
I’m a huge proponent of self-documenting code meaning that the code should be cleanly written and variables descriptive enough to tell me what it is doing.
The only time I put comments in my code is when I need to explain the why behind something.

For example:
```csharp
private static void ExecuteWiqlQuery(string wiqlQuery)
{
    var workItems = new List<WorkItem>();

    var id = 0;

    // Because Microsoft limits query execution to 20k, we need to batch the calls
    // We'll use the top parameter and filter the results based on the IDs
    while (true)
    {
        var wiql = new Wiql
        {
            Query = string.Format(wiqlQuery + $" AND [System.Id] > {id} ORDER BY [System.Id] asc")
        };

        // The workItemQueryResult will contain a count of the work items from the query
        // and the ID for each of the work items. You will need to loop through the list
        // and expand them to get details.
        var workItemQueryResult = _workItemTrackingHttpClient.QueryByWiqlAsync(wiql, top: QueryTop).Result;

        if (!workItemQueryResult.WorkItems.Any()) break;

        id = workItemQueryResult.WorkItems.Max(wi => wi.Id);

        workItems.AddRange(ExpandWorkItems(workItemQueryResult));
    }

    foreach (var workItem in workItems) Console.WriteLine(workItem.Id);
}
```

Upon looking over the `index.js` file, I noticed that this is a simple Node.js script with what appears to several errors in the script.
After reviewing the code for any potentially harmful syntax, I went ahead with running `npm install` to install the dependencies defied in the `package.json` file.
From there, I simply ran the script by executing `npm run start` from the terminal and begin working through the errors it gave me.

# Fixes Made
- Removed the line below since `express` was not in the `package.json` file (causing an error) and the `index.js` file did not use the variable in the file
```js
var express = require('express');
```
- Defined `employees` based on how it was used in the `for` loop. It appears to be used as a simple string array
- Added a constant called `YourName` to fix error in `isMe` function
- Removed the following unused lines of code
```js
pi = 3.14;
const cors = required('cors');
```
- Removed the code block below due it not functioning as written. This code, on the surface, serves no purpose and does not work considering the payload returned. In situations like these, I would try to find the original author or requirement to determine if a bug was introduced either by a change we (being the code owners) made or the API maintainer. In either case, this block is broken
```js
if (response.length == 0) {
    for (let i = 0; i < response.length; i++) {
        if (response[i].length < 50) {
            if (response[i].includes('Linus')) {
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
```
- Renamed `response` to `postsResponse` to better reflect what it is
- Renamed `response` to `posts` to better reflect what it is
```js
// renamed this
response = response.data

// to this
posts = response.data
```
- Optimized code by removeing this API call: `axios.get('https://jsonplaceholder.typicode.com/posts/1')` (The returned data was not used anywhere else)
- Renamed `response3` to `commentsResponse` to better reflect the data being returned

# Next Steps
- Align file to coding standards
  - There are style inconsistencies in the file so having the file align to a consistency would be helpful for future work
- Verify requirements
  - Several changes were made based on assumptions in the file, these should be verified
  - Ensure things like `setTimeout` are needed
- Personally, I would considering migrating to TypeScript
  - I enjoy type safety as well as null checking and generics
- Add unit tests
  - Have a way to test the code locally without having to make the API calls is a powerful feature
  - Makding the code unit testable is larger undertaking then the time constraints allowed for this situation
- Get the code peer reviewed
  - Ideally this should be done during a pull request
