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

async function getAlunoById(usuarioId) {
  try {
    const response = await fetch(`${baseUrl}/get/usuario/${usuarioId}`);
    if (!response.ok) throw new Error("Erro ao buscar aluno");
    const aluno = await response.json();
    return aluno; 
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    return null;
  }
}

async function addAluno(aluno) {
  // Removemos o ID 0 para não confundir o backend na criação
  const { id, ...dadosSemId } = aluno;

  const response = await fetch(`${baseUrl}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosSemId)
  });

  if (!response.ok) {
    const msg = await response.text();
    throw new Error(msg || "Erro ao adicionar aluno");
  }
  return await response.json(); // O backend DEVE retornar o objeto com o ID criado aqui
}

async function updateAluno(id, aluno) {
  const response = await fetch(`${baseUrl}/update/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(aluno)
  });

  if (!response.ok) throw new Error("Erro ao atualizar aluno");
  return await response.json();
}

async function deleteAluno(id) {
  const response = await fetch(`${baseUrl}/remove/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro ${response.status}: ${errorText}`);
  }
  return true;
}

export default { 
    getAlunos, 
    getAlunoById, 
    addAluno, 
    updateAluno, 
    deleteAluno 
};