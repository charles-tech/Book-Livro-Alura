let livros = [];
const endpointDaAPI =
  "https://guilhermeonrails.github.io/casadocodigo/livros.json";

getBuscarLivrosDaAPI();

async function getBuscarLivrosDaAPI() {
  const res = await fetch(endpointDaAPI);
  livros = await res.json();

  let livrosComDesconto = aplicarDesconto(livros);

  exibirOsLivrosNaTela(livrosComDesconto);
}

// ForEach
const elementoComValorTotalDeLivrosDisponiveis = document.getElementById(
  "valor_total_livros_disponiveis"
);
const elementoParaInserirLivros = document.getElementById("livros");

function exibirOsLivrosNaTela(listaDeLivros) {
  elementoComValorTotalDeLivrosDisponiveis.innerHTML = "";
  elementoParaInserirLivros.innerHTML = "";
  listaDeLivros.forEach((livro) => {
    let disponibilidade =
      livro.quantidade > 0 ? "livro__imagens" : "livro__imagens indisponivel";

    elementoParaInserirLivros.innerHTML += `
        <div class="livro">
        <img class="${disponibilidade}" src="${livro.imagem}"
          alt="${livro.alt}" />
        <h2 class="livro__titulo">
          ${livro.titulo}
        </h2>
        <p class="livro__descricao">${livro.autor}</p>
        <p class="livro__preco" id="preco">R$${livro.preco.toFixed(2)}</p>
        <div class="tags">
          <span class="tag">${livro.categoria}</span>
        </div>
      </div>
        `;
  });
}

// Map
function aplicarDesconto(livros) {
  const desconto = 0.3;
  livrosComDesconto = livros.map((livro) => {
    return { ...livro, preco: livro.preco - livro.preco * desconto };
  });
  return livrosComDesconto;
}

// Filter

const botoes = document.querySelectorAll(".btn");

botoes.forEach((btn) => btn.addEventListener("click", filtrarLivros));

function filtrarLivros() {
  const elementoBtn = document.getElementById(this.id);
  const categoria = elementoBtn.value;

  let livorsFiltrados =
    categoria == "disponivel"
      ? livros.filter((livro) => livro.quantidade > 0)
      : livros.filter((livro) => livro.categoria == categoria);
  exibirOsLivrosNaTela(livorsFiltrados);
  if (categoria == "disponivel") {
    const valorTotal = calcularValorTotalDeLivrosDisponiveis(livorsFiltrados);
    exibirValorTotalDosLivrosDisponiveisNaTela(valorTotal);
  }
}
function exibirValorTotalDosLivrosDisponiveisNaTela(valorTotal) {
  elementoComValorTotalDeLivrosDisponiveis.innerHTML = `<div class="livros__disponiveis">
  <p>Todos os livros disponíveis por R$ <span id="valor">${valorTotal}</span></p>
</div>`;
}

// Sort

let btnOrdernarPorPreco = document.getElementById("btnOrdenarPorPreco");
btnOrdernarPorPreco.addEventListener("click", ordernarLivrosPorPreco);

function ordernarLivrosPorPreco() {
  let livrosOrdenados = livros.sort((a, b) => a.preco - b.preco);
  exibirOsLivrosNaTela(livrosOrdenados);
}

// Reduce

function calcularValorTotalDeLivrosDisponiveis(livros) {
  return livros.reduce((acc, livro) => acc + livro.preco, 0).toFixed(2);
}
