let elmentButton = document.querySelector('button#pesquisar');
elmentButton.onclick = pesquisa;

//Adiciona todos os repositório na tabela
function buscaRepositorios(repositorios) {
  const elementList = document.querySelector('tbody#list');
  const elementQaunt = document.querySelector('#quant');
  let quant = 0;


  for (const repo of repositorios) {
    const name = document.createTextNode(repo.name);

    const elementTr = document.createElement('tr');
    const elementTd = document.createElement('td');
    const elementLink = document.createElement('a');

    elementLink.setAttribute('href', '#');

    elementLink.appendChild(name);
    elementTd.appendChild(elementLink);
    elementTr.appendChild(elementTd);
    elementList.appendChild(elementTr);
    quant += 1;
  }

  elementQaunt.innerHTML = `Quantidade de repositórios publicos: ${quant}`;
  //Appós carregar todas as informações é alterado novamente a descrição do botão
  elmentButton.innerHTML = 'Pesquisar';
}

//Executa enqunto a requisiçãoestá acontecendo
function loading() {
  elmentButton.innerHTML = '';
  let elementText = document.createTextNode('Carregando...');
  elmentButton.appendChild(elementText);
}
//Mostra mostra alerta de erro, caso tenha algum erro de comunicação com o perfil ou apenas com a lista de repositórios.
function loadingError() {
  elmentButton.innerHTML = '';
  let textError = document.createTextNode('Erro!');
  elmentButton.appendChild(textError);
}

//Busca todos os repositórios do usuário
function repositorio(url) {

  axios.get(url)
    .then(function (response) {
      buscaRepositorios(response.data);
    })
    .catch(function () {
      loadingError();
    })
}

//Função principal da pesquisa
function pesquisa() {
  const user = document.querySelector('input#usu-name').value;
  const url = `https://api.github.com/users/${user}`;

  //Se existir usuário faz o consumo da API
  if (!user) return;
  loading();

  axios.get(url)
    .then(function (response) {

      const elementAvatar = document.querySelector('img#avatar');
      const elementLogin = document.querySelector('#login');
      const elementLName = document.querySelector('#name');
      const elementLink = document.querySelector('a#link');

      const avatar = response.data.avatar_url;
      const login = response.data.login;
      const name = response.data.name;
      const url = response.data.html_url;

      elementAvatar.setAttribute('src', avatar);
      elementLogin.innerHTML = login;
      elementLName.innerHTML = name;
      elementLink.setAttribute('href', url);


      const repos_url = response.data.repos_url;
      //Faz a chamada para a API dos Repositórios do usuário
      repositorio(repos_url);

    })
    .catch(function () {
      loadingError();
    })
}
