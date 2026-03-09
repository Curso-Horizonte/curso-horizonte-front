const baseUrl = 'https://api-horizonte.onrender.com/api/observacao';

async function getObservacao() {
  try {
    const response = await fetch(`${baseUrl}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar observações: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar observações:", error);
    return [];
  }
}


async function addObservacao(observacao) {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(observacao)
    });

    if (!response.ok) {
      throw new Error(`Erro ao adicionar observação`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function updateObservacao(id, observacao) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(observacao)
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar observação`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function deleteObservacao(id) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar professor:", error);
    throw error;
  }
}

export default {
  getObservacao,
  addObservacao,
  updateObservacao,
  deleteObservacao
};