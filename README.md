# ThinkTree

A simple web app for clear decision making.

## How it works (not done)

Decision making can be difficult. This app aims to streamline the process. You enter the variables, the uncertainties, and let the app visualize the best option for you. First,

### Add all possible options
On the column on the right. For choosing an occupation, this might be doctor, teacher, software engineer, etc.

### Add factors in consideration.
On the column on the left. E.g. career growth, years to study, salary, reputation, etc.

### Adjust the weights
A software engineering degree typically takes 4 years, with an average salary of $100,000 (probably). A medical degree takes, say 10 years. Input this into the app and let it do the work.

### Deal with uncertainties
Often, decision making is not this straightforward. You might worry about failing medical school, or programming not being your thing. Input the percentage of how likely this is going to happen, and how that would affect your choices if it did.

### Calculate choice
Concise and clear.


## Current TODO:
- Make the text in Boxes more visible. Curently, selected Boxes become brighter, making the text hard to read. (Easy)
- Make a user able to rank each factor. I'm thinking a number to the left of each factor, scrollable on mouse hover, on a scale of 1-10. (Medium)
- Refactoring the app state into App using context for a redux pattern. (Medium)
- Heightened visibility of selected Options Boxes. If an Option Box is clicked, that box and all its connections should be easily visible. Currently only works for Factors Boxes. (Hard)
- make it possible to add child Boxes to Factors (Hard)

