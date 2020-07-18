# Introduction
A widget to display your GitHub repo on a page.

![Example output](https://raw.githubusercontent.com/iJKTen/github-card/master/public/example.png)

GitHub Card is created via web components and in your HTML file you can use it via a custom element

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