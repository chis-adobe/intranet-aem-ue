/* eslint-disable no-underscore-dangle */
export default async function decorate(block) {
  const props = [...block.children];
  const roleFolderPairs = {};
  const firstRole = props[0].textContent.trim();
  const firstFolder = props[1].textContent.trim();
  roleFolderPairs[firstRole] = firstFolder;

  const feedDataReq = await fetch("https:/publish-p130746-e1298459.adobeaemcloud.com/content/dam/igm/tech.5.json");

  const feedDataJson = await feedDataReq.json();
  let keys = Object.keys(feedDataJson);

  let itemsHTML = '';
  for(let keyIndex = 0; keyIndex < keys.length; keyIndex++){
    let key = keys[keyIndex];

    if(key.startsWith("jcr:")) {
      continue;
    }

    let assetJson = feedDataJson[key];
    let assetMetadataJson = assetJson["jcr:content"].metadata;
    let assetDescription = assetMetadataJson["dc:description"];

    itemsHTML += `
      <li>
        <img src="https://author-p130746-e1298459.adobeaemcloud.com/content/dam/igm/tech/${key}">
        ${assetDescription ? "<div class='description'>" + assetDescription + "</div>" : ""} 
      </li>
    `
  }

  block.innerHTML = `
    <h2 class='section-heading'>Your Personalized Feed</h2>
    <ul class="feed-list">
      ${itemsHTML}
    </ul>`;
}
