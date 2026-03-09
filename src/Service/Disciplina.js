const baseUrl = 'https://api-horizonte.onrender.com/api/disciplina';

async function getDisciplinas() {
  try {
    const response = await fetch(`${baseUrl}`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar disciplinas: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar disciplinas:", error);
    return [];
  }
}


async function addDisciplina(disciplina) {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(disciplina)
    });

    if (!response.ok) {
      throw new Error(`Erro ao adicionar disciplina`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function updateDisciplina(id, disciplina) {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(disciplina)
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar disciplina`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function deleteDisciplina(id) {
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
  getDisciplinas,
  addDisciplina,
  updateDisciplina,
  deleteDisciplina
};