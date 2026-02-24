# B13-Assignment-04

## 1. Difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll 

getElementById: With this, one element is found with its ID. ID is unique, therefore it will always pick one.
getElementsByClassName: By this we are able to find all the elements which share the same class name. It Returns a list of elements.
querySelector: It uses it to find the first element which matches any CSS selector.
querySelectorAll: With the help of it, all the elements that correspond to any CSS finder are located. It also gives a list of elements such as class name.

## 2. How to create and insert a new element into the DOM

Start by creating a new memory element. Make a fresh div element.  
Secondly, include some content or text within it. Put some text inside of it.  
Third, make it visible by inserting it into the page. Put it on the page.

## 3. What is Event Bubbling? How does it work?

Bubbling of event occurs when an event is clicked on an element and then the event is automatically sent to its parents.

As an example, when a button is clicked within a div:
First the button receive the click.
Then the div
Then the body
Then html

## 4. What is Event Delegation? Why is it useful?

Event Delegation implies to add one event listener to parent. This is one listener which may serve all child elements.

It is very useful because:
Does not require event listening on all children.
It is also applicable to new elements that are subsequently introduced within the parent.

## 5. Difference between preventDefault() and stopPropagation()

preventDefault: The prevents the default of an element. The point is that a link will not take up a new page or a form will not submit.
stopPropagation(): Prevents the event propagation to the parent elements. The incident will remain on the surface on which it occurred.

