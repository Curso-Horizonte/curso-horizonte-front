const baseUrl = 'https://api-horizonte.onrender.com/api/professor';

async function getProfessores() {
  try {
    const response = await fetch(`${baseUrl}/get`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar professores: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar professores:", error);
    return [];
  }
}

async function getProfessorById(id) {
  try {
    const response = await fetch(`${baseUrl}/get`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar professor`);
    }

    const data = await response.json();
    return data.find(p => p.id === Number(id));
  } catch (error) {
    console.error(error);
  }
}

async function addProfessor(professor) {
  try {
    const response = await fetch(`${baseUrl}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(professor)
    });

    if (!response.ok) {
      throw new Error(`Erro ao adicionar professor`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function updateProfessor(id, professor) {
  try {
    const response = await fetch(`${baseUrl}/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(professor)
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar professor`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function deleteProfessor(id) {
  try {
    const response = await fetch(`${baseUrl}/delete/${id}`, {
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
  getProfessores,
  getProfessorById,
  addProfessor,
  updateProfessor,
  deleteProfessor
};