(function() {
  'use strict';

  const init = () => {
    const elements = document.querySelectorAll('div[data-repo]');
    for (const element of elements) {
      getGitHubRepo(element.dataset.repo, (repo) => {
        displayRepo(element, repo);
      }, (statusCode, statusText) => {
        displayError(element, statusText);
      });
    }
  };

  const displayError = (element, statusText) => {
    const elem = buildElemWithValue('div', `GitHub API called failed with message ${statusText}`);
    element.appendChild(elem);
  }

  const getGitHubRepo = (repoName, onResult, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/repos/${repoName}`);
    xhr.send();

    xhr.onload = () => {
      const data = JSON.parse(xhr.response);
      onResult(data);
    };

    xhr.onerror = () => {
      onError(xhr.status, xhr.statusText)
    }
  };

  const displayRepo = (element, repo) => {
    const repoDiv = document.createElement('div');
    const owner = buildOwner(repo);
    const avatarImg = buildAvatarImage(repo);
    const nameElem = buildElemWithValue('div', repo.name);
    const descriptionElem = buildElemWithValue('div', repo.description);
    const languagesElem = buildElemWithValue('div', repo.language);

    languagesElem.classList.add('lang');
    nameElem.classList.add('name');

    const ownerDiv = document.createElement('div');
    ownerDiv.classList.add('owner');
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');
    detailsDiv.appendChild(descriptionElem);

    const starsElem = buildStars(repo);

    repoDiv.appendChild(nameElem);
    ownerDiv.appendChild(avatarImg);
    ownerDiv.appendChild(owner);
    repoDiv.appendChild(ownerDiv);
    repoDiv.appendChild(starsElem);
    repoDiv.appendChild(detailsDiv);
    repoDiv.appendChild(languagesElem);

    repoDiv.classList.add('repo');
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

    // path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('d', 'M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z');

    div.classList.add('stars');

    svg.appendChild(path);
    svgSpan.appendChild(svg);
    svgSpan.appendChild(starElem);
    // div.appendChild(svg);
    // div.appendChild(starElem);
    div.appendChild(svgSpan);
    div.appendChild(starCountElem);
    return div;
  };

  init();
})();
