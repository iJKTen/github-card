(function () {
  'use strict';

  const init = () => {
    const elements = document.querySelectorAll('div[data-repo]');
    for (const element of elements) {
      getGitHubRepoPromise(element.dataset.repo)
        .then((repo) => {
          makeCard(element, repo);
        })
        .catch((error) => {
          displayError(element, error);
        });
    }
  };

  const displayError = (element, statusText) => {
    const msg = `GitHub API called failed with message ${statusText.message}`;
    const elem = buildElemWithValue('div', msg);
    elem.classList.add('repo');
    element.appendChild(elem);
  };

  const getGitHubRepoPromise = (repoName) => {
    return new Promise(function (resolve, reject) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `https://api.github.com/repos/${repoName}`);
      xhr.send();

      xhr.onload = () => {
        const data = JSON.parse(xhr.response);
        resolve(data);
      };

      xhr.onerror = () => {
        reject(new Error(`request return status ${xhr.status} with message ${xhr.statusText}`));
      };
    });
  };

  const makeCard = (element, repo) => {
    const repoDiv = document.createElement('div');
    const anchorToRepoElem = buildAnchorToRepo(repo);
    const nameElem = buildElemWithValue('div', repo.name);
    const avatarImg = buildAvatarImage(repo);
    const ownerDiv = document.createElement('div');
    const ownerElem = buildOwner(repo);
    const starsElem = buildStars(repo);
    const descriptionElem = buildElemWithValue('div', repo.description);
    const languagesElem = buildElemWithValue('div', repo.language);
    const anchorToRepoStarsElem = buildAnchorToRepo(repo);
    const anchorToAuth = buildAnchorToAuthor();
    const createdByElem = buildElemWithValue('div', 'widget by ijkTen');

    repoDiv.classList.add('repo');
    createdByElem.classList.add('createdby');
    languagesElem.classList.add('lang');
    nameElem.classList.add('name');
    ownerDiv.classList.add('owner');
    descriptionElem.classList.add('desc');
    anchorToRepoStarsElem.classList.add('lnk');
    anchorToAuth.classList.add('lnk');

    anchorToRepoElem.appendChild(nameElem);
    anchorToRepoStarsElem.appendChild(starsElem);
    anchorToAuth.appendChild(createdByElem);

    if (avatarImg) {
      ownerDiv.appendChild(avatarImg);
    }
    ownerDiv.appendChild(ownerElem);
    repoDiv.appendChild(anchorToRepoElem);
    repoDiv.appendChild(ownerDiv);
    repoDiv.appendChild(anchorToRepoStarsElem);
    repoDiv.appendChild(descriptionElem);
    repoDiv.appendChild(languagesElem);
    repoDiv.appendChild(anchorToAuth);

    element.appendChild(repoDiv);
  };

  const buildAvatarImage = (data) => {
    if ({}.hasOwnProperty.call(data, 'owner')) {
      const avatarElem = document.createElement('img');
      avatarElem.src = data.owner.avatar_url;
      avatarElem.title = data.owner.login;
      avatarElem.alt = data.owner.login;
      return avatarElem;
    }

    return null;
  };

  const buildOwner = (data) => {
    const elem = document.createElement('div');
    elem.classList.add('byline');
    elem.innerText = `by ${data.owner.login}`;
    return elem;
  };

  const buildElemWithValue = (elemName, value) => {
    const elem = document.createElement(elemName);
    elem.innerText = value;
    return elem;
  };

  const buildStars = (data) => {
    const xmlns = 'http://www.w3.org/2000/svg';
    const div = document.createElement('div');
    const starCountElem = buildElemWithValue('span', data.stargazers_count);
    const starElem = buildElemWithValue('span', ' Star ');
    const svgSpan = document.createElement('span');
    const svg = document.createElementNS(xmlns, 'svg');
    const path = document.createElementNS(xmlns, 'path');

    svg.setAttribute('width', '14');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 -2 14 16');
    svg.setAttribute('aria-hidden', true);

    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('d', 'M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z');

    div.classList.add('stars');

    svg.appendChild(path);
    svgSpan.appendChild(svg);
    svgSpan.appendChild(starElem);
    div.appendChild(svgSpan);
    div.appendChild(starCountElem);
    return div;
  };

  const buildAnchorToRepo = (repo) => {
    const anchorElem = document.createElement('a');
    anchorElem.setAttribute('href', repo.html_url);
    anchorElem.setAttribute('target', '_blank');
    return anchorElem;
  };

  const buildAnchorToAuthor = () => {
    const anchorElem = document.createElement('a');
    anchorElem.setAttribute('href', 'https://github.com/ijkten/github-card');
    anchorElem.setAttribute('target', '_blank');
    anchorElem.setAttribute('rel', 'nofollow noreferrer noopener');
    return anchorElem;
  };

  init();
})();
