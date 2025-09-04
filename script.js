let produtos = [];

const nomeInput = document.getElementById("nome");
const precoInput = document.getElementById("preco");
const quantidadeInput = document.getElementById("quantidade");
const btnAdicionar = document.getElementById("btnAdicionar");
const produtosContainer = document.getElementById("produtosContainer");

function renderProdutos() {
  produtosContainer.innerHTML = "";

  if (produtos.length === 0) {
    produtosContainer.innerHTML = "<p>Estoque vazio.</p>";
    return;
  }

  produtos.forEach((produto, index) => {
    const card = document.createElement("div");
    card.className = "produto-card";

    const info = document.createElement("div");
    info.className = "produto-info";
    info.innerHTML = `<strong>${produto.nome}</strong> | Preço: R$${produto.preco.toFixed(2)} | Quantidade: ${produto.quantidade}`;

    const actions = document.createElement("div");
    actions.className = "produto-actions";

    const btnAtualizar = document.createElement("button");
    btnAtualizar.className = "atualizar";
    btnAtualizar.textContent = "🔄 Atualizar";
    btnAtualizar.addEventListener("click", () => {
      const novaQtd = Number(prompt(`Informe a nova quantidade para "${produto.nome}":`));
      if (!isNaN(novaQtd)) {
        produtos[index].quantidade = novaQtd;
        renderProdutos();
        alert(`Quantidade de "${produto.nome}" atualizada para ${novaQtd}`);
      } else {
        alert("Quantidade inválida.");
      }
    });

    const btnRemover = document.createElement("button");
    btnRemover.className = "remover";
    btnRemover.textContent = "❌ Remover";
    btnRemover.addEventListener("click", () => {
      produtos.splice(index, 1);
      renderProdutos();
      alert(`Produto "${produto.nome}" removido do estoque.`);
    });

    actions.appendChild(btnAtualizar);
    actions.appendChild(btnRemover);

    card.appendChild(info);
    card.appendChild(actions);

    produtosContainer.appendChild(card);
  });
}

btnAdicionar.addEventListener("click", () => {
  const nome = nomeInput.value.trim();
  const preco = Number(precoInput.value);
  const quantidade = Number(quantidadeInput.value);

  if (!nome || isNaN(preco) || isNaN(quantidade)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  produtos.push({ nome, preco, quantidade });
  renderProdutos();
  alert(`Produto "${nome}" adicionado com sucesso!`);

  nomeInput.value = "";
  precoInput.value = "";
  quantidadeInput.value = "";
});
