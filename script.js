const BASE_URL = "http://localhost:3000"; // ou a URL do seu servidor

let clienteEditando = null;
let produtoEditando = null;

// Função para criar ou atualizar cliente
document.getElementById("formCreateCliente").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nomeCliente").value;
  const cpf = document.getElementById("cpfCliente").value;

  if (!nome || !cpf) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    let response;
    if (clienteEditando) {
      // Atualizando o cliente
      response = await fetch(`${BASE_URL}/clientes/${clienteEditando}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf }),
      });
    } else {
      // Criando novo cliente
      response = await fetch(`${BASE_URL}/clientes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf }),
      });
    }

    if (response.ok) {
      const data = await response.text();
      alert(data);
      loadClientes(); // Atualiza a lista de clientes
      resetClienteForm(); // Reseta o formulário
    } else {
      alert("Erro ao adicionar ou atualizar cliente");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao adicionar ou atualizar cliente");
  }
});

// Função para criar ou atualizar produto
document.getElementById("formCreateProduto").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nomeProduto").value;
  const preco = document.getElementById("precoProduto").value;

  if (!nome || !preco) {
    alert("Preencha todos os campos!");
    return;
  }

  try {
    let response;
    if (produtoEditando) {
      // Atualizando o produto
      response = await fetch(`${BASE_URL}/produtos/${produtoEditando}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Nome: nome, Preco: parseFloat(preco) }),
      });
    } else {
      // Criando novo produto
      response = await fetch(`${BASE_URL}/produtos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Nome: nome, Preco: parseFloat(preco) }),
      });
    }

    if (response.ok) {
      const data = await response.text();
      alert(data);
      loadProdutos(); // Atualiza a lista de produtos
      resetProdutoForm(); // Reseta o formulário
    } else {
      alert("Erro ao adicionar ou atualizar produto");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao adicionar ou atualizar produto");
  }
});

// Função para carregar e exibir todos os clientes cadastrados
async function loadClientes() {
  try {
    const response = await fetch(`${BASE_URL}/clientes`);
    const clientes = await response.json();

    const listaClientes = document.getElementById("listaClientes");
    listaClientes.innerHTML = "";

    clientes.forEach((cliente) => {
      const li = document.createElement("li");
      li.innerHTML = `Nome: ${cliente.nome}, CPF: ${cliente.cpf}`;
      li.innerHTML += `
        <div class="actions">
          <i class="fas fa-edit" onclick="editCliente('${cliente.id}', '${cliente.nome}', '${cliente.cpf}')"></i>
          <i class="fas fa-trash" onclick="deleteCliente('${cliente.id}')"></i>
        </div>
      `;
      listaClientes.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar clientes:", error);
    alert("Erro ao carregar clientes");
  }
}

// Função para carregar e exibir todos os produtos cadastrados
async function loadProdutos() {
  try {
    const response = await fetch(`${BASE_URL}/produtos`);
    const produtos = await response.json();

    const listaProdutos = document.getElementById("listaProdutos");
    listaProdutos.innerHTML = "";

    produtos.forEach((produto) => {
      const li = document.createElement("li");
      li.innerHTML = `Nome: ${produto.Nome}, Preço: R$ ${produto.Preco.toFixed(2)}`;
      li.innerHTML += `
        <div class="actions">
          <i class="fas fa-edit" onclick="editProduto('${produto.id}', '${produto.Nome}', '${produto.Preco}')"></i>
          <i class="fas fa-trash" onclick="deleteProduto('${produto.id}')"></i>
        </div>
      `;
      listaProdutos.appendChild(li);
    });
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    alert("Erro ao carregar produtos");
  }
}

// Função para deletar cliente
async function deleteCliente(clienteId) {
  try {
    const response = await fetch(`${BASE_URL}/clientes/${clienteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Cliente deletado com sucesso!");
      loadClientes(); // Atualiza a lista de clientes
    } else {
      alert("Erro ao deletar cliente");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao deletar cliente");
  }
}

// Função para editar cliente
function editCliente(clienteId, nome, cpf) {
  clienteEditando = clienteId;
  document.getElementById("nomeCliente").value = nome;
  document.getElementById("cpfCliente").value = cpf;

  // Alterando o texto do botão para "Atualizar"
  document.getElementById("formCreateCliente").querySelector("button").textContent = "Atualizar Cliente";
}

// Função para deletar produto
async function deleteProduto(produtoId) {
  try {
    const response = await fetch(`${BASE_URL}/produtos/${produtoId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Produto deletado com sucesso!");
      loadProdutos(); // Atualiza a lista de produtos
    } else {
      alert("Erro ao deletar produto");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao deletar produto");
  }
}

// Função para editar produto
function editProduto(produtoId, nome, preco) {
  produtoEditando = produtoId;
  document.getElementById("nomeProduto").value = nome;
  document.getElementById("precoProduto").value = preco;

  // Alterando o texto do botão para "Atualizar"
  document.getElementById("formCreateProduto").querySelector("button").textContent = "Atualizar Produto";
}

// Reseta o formulário de cliente
function resetClienteForm() {
  clienteEditando = null;
  document.getElementById("nomeCliente").value = "";
  document.getElementById("cpfCliente").value = "";

  // Volta o botão para "Criar Cliente"
  document.getElementById("formCreateCliente").querySelector("button").textContent = "Criar Cliente";
}

// Reseta o formulário de produto
function resetProdutoForm() {
  produtoEditando = null;
  document.getElementById("nomeProduto").value = "";
  document.getElementById("precoProduto").value = "";

  // Volta o botão para "Criar Produto"
  document.getElementById("formCreateProduto").querySelector("button").textContent = "Criar Produto";
}

// Carrega os dados iniciais ao carregar a página
window.onload = () => {
  loadClientes();
  loadProdutos();
};
