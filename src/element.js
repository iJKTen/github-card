/* eslint-disable require-jsdoc */
'use strict';

window.addEventListener('load', () => {
  (() => {
    const fetchRepo = (repo) => {
      return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/repos/${repo}`)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            resolve(json);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };

    class GitHubCard extends HTMLElement {
      constructor() {
        super();
        const repoName = this.repoName;
        const repoUrl = `//GitHub.com/${repoName}`;
        const style = `
          * {
            --orange-color: orange;
          }
          a {
            text-decoration: none;
          }
          .repo {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            text-align: center;
            border: 1px solid rgba(7,8,23,0.75);
            border-radius: 5px;
            max-width: 220px;
            margin: 20px auto;
            padding: 10px;
            box-shadow: 10px 11px 10px -8px rgba(7,8,23,0.75);
            box-sizing: border-box;
          }
          .githubCard {
            color: var(--orange-color);
            padding-bottom: 8px;
            font-weight: bold;
            display: block;
          }
          .owner > img {
            width: 96px;
            height: 96px;
          }
          .repo .byline {
            color: #333;
            font-size: 12px;
          }
          .repo .stars {
            display: block;
            margin-top: 8px;
            line-height: 26px;
          }
          .repo .stars > div  > span:first-child {
            background-color: #D3D3D3;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            padding: 4px;
          }
          .repo .stars > div > span:last-child {
            background-color: #A9A9A9;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            padding: 4px 8px;
          }
          .repo .desc {
            padding: 16px 0px;
          }
          .repo .lang {
            background-color: var(--orange-color);
            padding: 4px;
            border-radius: 4px;
            text-align: center;
          }
          .repo .createdBy {
            font-size: 10px;
            padding-top: 8px;
            text-align: right;
            font-style: italic;
          }
        `;

        const htmlElement = document.createElement('template');
        htmlElement.innerHTML = `
          <div class='repo'>
            <a class='githubCard' href='${repoUrl}'>GitHub Card</a>
            <div class='owner'>
              <img src='' title='' alt='' />
              <div class='byline'></div>
            </div>
            <a 
              class='stars' 
              href='${repoUrl}' 
              target='_blank' 
              rel='noopener nofollow noreferrer'>
                <div>
                    <span>
                      <svg width="14" height="16" viewBox="0 -2 14 16" aria-hidden="true"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg>
                      <span>Star</span>
                    </span>
                    <span class='starCount'></span>
                </div>
            </a>
            <div class='desc'></div>
            <div class='lang'></div>
            <a class='createdBy' href='//GitHub.com/iJKTen/GitHub-Card' target='_blank' rel='noopener nofollow noreferrer'>
              <div class='createdBy'>widget by iJKTen</a>
            </a>
          </div>
        `;

        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
          <style>
            ${style}
          </style>
        `;
        this.shadowRoot.appendChild(htmlElement.content.cloneNode(true));

        fetchRepo(repoName)
          .then((data) => {
            const ownerImg = this.shadowRoot.querySelector('.owner > img');
            const byline = this.shadowRoot.querySelector('.byline');
            const starCount = this.shadowRoot.querySelector('.starCount');
            const desc = this.shadowRoot.querySelector('.desc');
            const lang = this.shadowRoot.querySelector('.lang');

            ownerImg.src = data.owner.avatar_url;
            ownerImg.title = data.owner.login;
            ownerImg.alt = data.owner.login;
            byline.innerHTML = data.owner.login;
            starCount.innerHTML = data.stargazers_count;
            desc.innerHTML = data.description;
            lang.innerHTML = data.language;
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }

      get repoName() {
        return this.getAttribute('repo');
      }
    }

    customElements.define('github-card', GitHubCard);
  })();
});
