const baseUrl = 'https://api-horizonte.onrender.com/api/aluno';

async function getAlunos() {
  try {
    const response = await fetch(`${baseUrl}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
        throw new Error(`Erro ao buscar alunos: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      return [data];
    }
    return data;
  } catch (error) {
    console.error("Erro ao buscar alunos:", error);
    return [];
  } 
}

async function addAluno(aluno) {
    try {
        const response = await fetch(`${baseUrl}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });
        if (!response.ok) {
            throw new Error(`Erro ao adicionar aluno: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao adicionar aluno:", error);
    }
}

async function updateAluno(alunoId, aluno) {
    try {
        const response = await fetch(`${baseUrl}/update/${alunoId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aluno)
        });
        if (!response.ok) {
            throw new Error(`Erro ao atualizar aluno: ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        console.error("Erro ao atualizar aluno:", error);
    }
}

async function deleteAluno(alunoId) {
    try {
        const response = await fetch(`${baseUrl}/delete/${alunoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`Erro ao excluir aluno: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erro ao excluir aluno:", error);
    }
}

export default {
    getAlunos,
    addAluno,
    updateAluno,
    deleteAluno
};
