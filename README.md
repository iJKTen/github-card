# Introduction
A widget to display your GitHub repo on a page.

## How to use
Add a new div tag in your HTML like
```
<link href="eventually-on-a-cdn.css" rel="stylesheet" />
<div data-repo="github-username/repo-name" />
<script src="eventually-on-a-cdn.js></script>
```

You can use it multiple times like
```
<link href="eventually-on-a-cdn.css" rel="stylesheet" />
<div data-repo="github-username/repo-name" />
<div data-repo="github-username/another-repo-name" />
<script src="eventually-on-a-cdn.js></script>
```

### Working Example
```
<link href="../src/app.css" rel="stylesheet" />
<div data-repo="ijkten/github-card"></div>
<script src="../src/app.js"></script>
```

### What you get
![Example output](https://raw.githubusercontent.com/iJKTen/github-card/master/public/example.png)