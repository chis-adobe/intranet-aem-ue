export default async function decorate(block) {
  const props = [...block.children];
  const currency = props[0].textContent.trim() ?? 'AUD';

  const container = document.createElement('table');
  const url = `https://20092-securbankdemo-stage.adobeio-static.net/api/v1/web/dx-excshell-1/forex?baseCurrency=${currency}`;
  const options = {};
  const forexReq = await fetch(url, options);
  const index = await forexReq.json();
  index.currencies
    .forEach((currency) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="/icons/flag-${currency.currencyCode}.svg" alt="An Flag for ${currency.currencyCode} "></td>
        <td>${currency.currencyTitle}</td>
        <td>${currency.currencyCode}</td>
        <td>${currency.forex}</td>
      `;
      container.append(tr);
    });
  block.innerHTML = `<h2 class='sectionHeading'>Exchange Rates for the ${index.title}</h2>`;
  block.append(container);
}
