import HeaderComponent from "../../../components/header/header";
import "./hub.css";
import EditIcon from "../../../assets/edit.png";
import DeleteIcon from "../../../assets/delete.png";
import AddIcon from "../../../assets/add.png";
import EmojiIcon from "../../../assets/emoji.png";
import ExportIcon from "../../../assets/export.png";
import ExpandIcon from "../../../assets/expand.png";
import SearchIcon from "../../../assets/search.png";

function TeachersHub() {
  const documents = [
    { id: 1, title: "Historia da arte", date: "28/21/20002" },
    { id: 2, title: "Historia da arte", date: "28/21/20002" },
    { id: 3, title: "Historia da arte", date: "28/21/20002" },
    { id: 4, title: "Historia da arte", date: "28/21/20002" },
    { id: 5, title: "Historia da arte", date: "28/21/20002" },
    { id: 6, title: "Historia da arte", date: "28/21/20002" },
  ];

  const students = [
    { id: 1, name: "John Doe", bim1: 8, bim2: 8, bim3: null, bim4: null, media: 9 },
    { id: 2, name: "John Doe", bim1: 8, bim2: 8, bim3: null, bim4: null, media: 9 },
    { id: 3, name: "John Doe", bim1: 8, bim2: 8, bim3: null, bim4: null, media: 9 },
    { id: 4, name: "John Doe", bim1: 8, bim2: 8, bim3: null, bim4: null, media: 9 },
    { id: 5, name: "John Doe", bim1: 8, bim2: 8, bim3: null, bim4: null, media: 9 },
    { id: 6, name: "John Doe", bim1: 8, bim2: 8, bim3: null, bim4: null, media: 9 },
  ];

  return (
    <div className="teachers-hub-wrapper">
      <HeaderComponent />
      <div className="hub-container">
        <div className="teachers-header">
          <h6>Hub do Professor - Matematica 2026</h6>
          <h1>Matematica 2026</h1>
          <h3>Verifique os insights e lançe notas</h3>
        </div>

        <div className="hub-cards-row">
          <div className="documents-container">
            <h2 className="documents-title">Documentos</h2>

            <div className="documents-card">
              <table className="documents-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.title}</td>
                      <td>{doc.date}</td>
                      <td className="actions-cell">
                        <button className="action-btn edit-btn" title="Editar">
                          <img src={EditIcon} alt="Editar" width={18} height={18} />
                        </button>
                        <button className="action-btn delete-btn" title="Remover">
                          <img src={DeleteIcon} alt="Remover" width={18} height={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="add-document-btn">
              <img src={AddIcon} alt="" width={20} height={20} />
              Adicionar Documento
            </button>
          </div>

          <div className="grades-container">
            <div className="grades-card">
              <div className="grades-search-bar">
                <input type="text" placeholder="Nome do Aluno" className="grades-search-input" />
                <button className="grades-search-btn">
                  <img src={SearchIcon} alt="Buscar" width={18} height={18} />
                </button>
              </div>

              <table className="grades-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Bim. 1</th>
                    <th>Bim. 2</th>
                    <th>Bim. 3</th>
                    <th>Bim. 4</th>
                    <th>Média</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="student-name">{student.name}</td>
                      <td>
                        <span className="grade-cell">
                          {student.bim1}
                          <img src={EditIcon} alt="editar" width={12} height={12} className="grade-edit-icon" />
                        </span>
                      </td>
                      <td>
                        <span className="grade-cell">
                          {student.bim2}
                          <img src={EditIcon} alt="editar" width={12} height={12} className="grade-edit-icon" />
                        </span>
                      </td>
                      <td className="grade-empty">-</td>
                      <td className="grade-empty">-</td>
                      <td className="grade-media">{student.media}</td>
                      <td className="actions-cell">
                        <button className="action-btn" title="Feedback">
                          <img src={EmojiIcon} alt="Feedback" width={18} height={18} />
                        </button>
                        <button className="action-btn" title="Exportar">
                          <img src={ExportIcon} alt="Exportar" width={18} height={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="expand-btn" title="Expandir">
              <img src={ExpandIcon} alt="Expandir" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeachersHub;