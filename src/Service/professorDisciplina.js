const baseUrl = "https://api-horizonte.onrender.com/api/professor_disciplina";

async function getAll() {
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) throw new Error(`Erro ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar todos os vínculos:", error);
    return [];
  }
}

async function getProfessorbydisciplina(id) {
  try {
    const response = await fetch(`${baseUrl}/professor/${id}`);

    if (!response.ok) {
      throw new Error(`Erro ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar disciplinas do professor:", error);
    return [];
  }
}

async function vincular(professorId, disciplinaId) {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      professorId,
      disciplinaId
    })
  });

  if (!response.ok) {
    throw new Error("Erro ao vincular disciplina");
  }

  return await response.json();
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
  getProfessorbydisciplina,
  vincular,
  remover
};