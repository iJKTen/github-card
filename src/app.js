(function() {
  'use strict';

  const init = () => {
    const elements = document.querySelectorAll('div[data-repo]');
    for (const element of elements) {
      getGitHubRepo(element.dataset.repo, (repo) => {
        displayRepo(element, repo);
      });
    }
  };

  const getGitHubRepo = (repoName, onResult) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/repos/${repoName}`);
    xhr.send();

    xhr.onload = () => {
      const data = JSON.parse(xhr.response);
      onResult(data);
    };
  };

  const displayRepo = (element, repo) => {
    const repoDiv = document.createElement('div');
    const owner = buildOwner(repo);
    const avatarImg = buildAvatarImage(repo);
    const nameElem = buildElemWithValue('div', repo.name);
    const descriptionElem = buildElemWithValue('div', repo.description);
    const languagesElem = buildElemWithValue('div', repo.language);
    languagesElem.classList.add('lang');

    const ownerDiv = document.createElement('div');
    ownerDiv.classList.add('owner');
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');
    detailsDiv.appendChild(descriptionElem);

    ownerDiv.appendChild(nameElem);
    ownerDiv.appendChild(avatarImg);
    ownerDiv.appendChild(owner);
    repoDiv.appendChild(ownerDiv);
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
    elem.innerText = `by ${data.owner.login}`;
    return elem;
  }

  const buildElemWithValue = (elemName, value) => {
    const elem = document.createElement(elemName);
    elem.innerText = value;
    return elem;
  };

  init();
})();
