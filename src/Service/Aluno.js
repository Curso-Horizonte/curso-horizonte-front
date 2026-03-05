const baseUrl = 'https://api-horizonte.onrender.com/api/aluno';

async function getAlunos() {
  try {
    const response = await fetch(`${baseUrl}/get`);
    if (!response.ok) throw new Error(`Erro ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    return [];
  }
}

async function getAlunoById(id) {
  try {
    const response = await fetch(`${baseUrl}/get`);
    if (!response.ok) throw new Error("Erro ao buscar aluno");

    const data = await response.json();
    return data.find(p => p.id === Number(id));
  } catch (error) {
    console.error(error);
  }
}

async function addAluno(aluno) {
  try {
    const response = await fetch(`${baseUrl}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    });

    if (!response.ok) throw new Error("Erro ao adicionar aluno");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function updateAluno(id, aluno) {
  try {
    const response = await fetch(`${baseUrl}/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno)
    });

    if (!response.ok) throw new Error("Erro ao atualizar aluno");
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function deleteAluno(id) {
  try {
    const response = await fetch(`${baseUrl}/remove/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }

    return true;
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
    throw error;
  }
}

export default {
  getAlunos,
  getAlunoById,
  addAluno,
  updateAluno,
  deleteAluno
};