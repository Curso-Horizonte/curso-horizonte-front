const baseUrl = "https://api-horizonte.onrender.com/api/aluno_disciplina";

async function getAll() {
  try {
    const response = await fetch(baseUrl, {
      method: "GET"
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Erro ao buscar vínculos aluno-disciplina:", error);
    return [];
  }
}

async function vincular(alunoId, disciplinaId) {
  try {

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        alunoId,
        disciplinaId
      })
    });

    if (!response.ok) {
      throw new Error("Erro ao vincular disciplina");
    }

    return await response.json();

  } catch (error) {
    console.error("Erro ao vincular disciplina:", error);
  }
}

async function editar(id, alunoId, disciplinaId) {
  try {

    const response = await fetch(`${baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        alunoId,
        disciplinaId
      })
    });

    if (!response.ok) {
      throw new Error("Erro ao editar vínculo");
    }

    return await response.json();

  } catch (error) {
    console.error("Erro ao editar vínculo:", error);
  }
}

async function remover(id) {
  try {

    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`Erro ao remover vínculo: ${response.status}`);
    }

    return true;

  } catch (error) {
    console.error("Erro ao remover vínculo:", error);
  }
}

export default {
  getAll,
  vincular,
  editar,
  remover
};