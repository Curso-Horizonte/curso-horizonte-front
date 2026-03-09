const baseUrl = 'https://api-horizonte.onrender.com/api/documento';

async function getDocumento() {
  try {
    const response = await fetch(`${baseUrl}/get`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar documentos: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar documentos:", error);
    return [];
  }
}

async function getDocumentoById(id) {
  try {
    const response = await fetch(`${baseUrl}/get`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar documento`);
    }

    const data = await response.json();
    return data.find(p => p.id === Number(id));
  } catch (error) {
    console.error(error);
  }
}

async function addDocumento(documento) {
  try {
    const response = await fetch(`${baseUrl}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(documento)
    });

    if (!response.ok) {
      throw new Error(`Erro ao adicionar documento`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function updateDocumento(id, documento) {
  try {
    const response = await fetch(`${baseUrl}/update/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(documento)
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar documento`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function deleteDocumento(id) {
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
  getDocumento,
  getDocumentoById,
  addDocumento,
  updateDocumento,
  deleteDocumento
};