const baseUrl = 'https://api-horizonte.onrender.com/api/Nota';

async function getNotas() {
  try {
    const response = await fetch(`${baseUrl}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar notas: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar notas:", error);
    return [];
  }
}


async function addNota(nota) {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nota)
    });

    if (!response.ok) {
      throw new Error(`Erro ao adicionar nota`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function updateNota(id, nota) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nota)
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar nota`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function deleteNota(id) {
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
    console.error("Erro ao deletar nota:", error);
    throw error;
  }
}

async function getNotaByAlunoDisciplina(alunoId, disciplinaId) {
  try {
    const response = await fetch(`${baseUrl}/aluno/${alunoId}/disciplina/${disciplinaId}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar nota: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar nota:", error);
    throw error;
  }
}


export default {
  getNotas,
  addNota,
  updateNota,
  deleteNota,
  getNotaByAlunoDisciplina
};