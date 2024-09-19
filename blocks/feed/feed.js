/* eslint-disable no-underscore-dangle */
export default async function decorate(block) {
  const props = [...block.children];
  const roleFolderPairs = {};
  const firstRole = props[0].textContent.trim();
  const firstFolder = props[1].textContent.trim();
  const secondRole = props[2].textContent.trim();
  const secondFolder = props[3].textContent.trim();

  roleFolderPairs[firstRole] = firstFolder;
  roleFolderPairs[secondRole] = secondFolder;

  document.querySelector('form.login-form').addEventListener("submit", (e) => {
    const role = document.getElementById('username').value;

    generateFeed(role);
  });

  async function generateFeed(role) {
    const folder = roleFolderPairs[role];
    const feedDataReq = await fetch(`https:/publish-p130746-e1298459.adobeaemcloud.com${folder}.3.json`);

    const feedDataJson = await feedDataReq.json();
    const keys = Object.keys(feedDataJson);

    let itemsHTML = '';

    for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      const key = keys[keyIndex];

      if (key.startsWith('jcr:')) {
        continue;
      }

      const assetJson = feedDataJson[key];
      const assetMetadataJson = assetJson['jcr:content'].metadata;
      const assetDescription = assetMetadataJson['dc:description'];
      const assetDescriptionHtml = assetDescription ? `<div class="description">${assetDescription}</div>` : '';

      itemsHTML += `
        <li>
          <div class="feed-item">
            <img src="https://author-p130746-e1298459.adobeaemcloud.com/content/dam/igm/tech/${key}">
            ${assetDescriptionHtml}
          </div>
        </li>
      `;
    }

    block.innerHTML = `
      <h2 class='section-heading'>Your Personalized Feed</h2>
      <ul class="feed-list">
        ${itemsHTML}
      </ul>`;
  }
}
