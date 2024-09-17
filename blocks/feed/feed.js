/* eslint-disable no-underscore-dangle */
export default async function decorate(block) {
  const props = [...block.children];
  
  console.log(props);
}
