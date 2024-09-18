/* eslint-disable no-underscore-dangle */
export default async function decorate(block) {
  const props = [...block.children];
  const roleFolderPairs = {};
  const firstRole = props[0].textContent.trim();
  const firstFolder = props[1].textContent.trim();
  roleFolderPairs[firstRole] = firstFolder;

  console.log(roleFolderPairs);
}