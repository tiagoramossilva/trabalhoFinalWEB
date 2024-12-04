const BASE_URL = "http://localhost:3000"; 

let clienteEditando = null;
let produtoEditando = null;

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
      response = await fetch(`${BASE_URL}/clientes/${clienteEditando}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, cpf }),
      });
    } else {
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
      loadClientes(); 
      resetClienteForm(); 
    } else {
      alert("Erro ao adicionar ou atualizar cliente");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao adicionar ou atualizar cliente");
  }
});

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
      response = await fetch(`${BASE_URL}/produtos/${produtoEditando}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Nome: nome, Preco: parseFloat(preco) }),
      });
    } else {
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
      loadProdutos(); 
      resetProdutoForm(); 
    } else {
      alert("Erro ao adicionar ou atualizar produto");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao adicionar ou atualizar produto");
  }
});

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

async function deleteCliente(clienteId) {
  try {
    const response = await fetch(`${BASE_URL}/clientes/${clienteId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Cliente deletado com sucesso!");
      loadClientes(); 
    } else {
      alert("Erro ao deletar cliente");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao deletar cliente");
  }
}

function editCliente(clienteId, nome, cpf) {
  clienteEditando = clienteId;
  document.getElementById("nomeCliente").value = nome;
  document.getElementById("cpfCliente").value = cpf;

  document.getElementById("formCreateCliente").querySelector("button").textContent = "Atualizar Cliente";
}

async function deleteProduto(produtoId) {
  try {
    const response = await fetch(`${BASE_URL}/produtos/${produtoId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Produto deletado com sucesso!");
      loadProdutos();
    } else {
      alert("Erro ao deletar produto");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao deletar produto");
  }
}

function editProduto(produtoId, nome, preco) {
  produtoEditando = produtoId;
  document.getElementById("nomeProduto").value = nome;
  document.getElementById("precoProduto").value = preco;

  document.getElementById("formCreateProduto").querySelector("button").textContent = "Atualizar Produto";
}

function resetClienteForm() {
  clienteEditando = null;
  document.getElementById("nomeCliente").value = "";
  document.getElementById("cpfCliente").value = "";

  document.getElementById("formCreateCliente").querySelector("button").textContent = "Criar Cliente";
}

function resetProdutoForm() {
  produtoEditando = null;
  document.getElementById("nomeProduto").value = "";
  document.getElementById("precoProduto").value = "";

  document.getElementById("formCreateProduto").querySelector("button").textContent = "Criar Produto";
}

window.onload = () => {
  loadClientes();
  loadProdutos();
};
