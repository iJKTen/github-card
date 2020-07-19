# GitHub Card
A widget to display your GitHub repo on a page.

![Example output](https://raw.githubusercontent.com/iJKTen/github-card/master/public/example.png)

GitHub Card is created via web components and in your HTML file you can use it via a custom element

## Installation
1. Clone the repo
2. Run the command shown below
```
npm install
```
3. Open index.html in a browser which is located in the public folder

## How to use
Include the element.js file in your HTML file.
Add a new tag in your HTML like
```
<github-card repo="ijkten/github-card"></github-card>
```

You can use it multiple times like
```
<github-card repo="ijkten/github-card"></github-card>
<github-card repo="ijkten/punions-client"></github-card>
```

## To Do
1. Handle error cases
2. Package as an npm module