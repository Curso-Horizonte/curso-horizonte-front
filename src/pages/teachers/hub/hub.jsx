import { useState } from "react";
import HeaderComponent from "../../../components/header/header";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import Modal from "../../../components/modal/Modal";
import "./hub.css";
import EditIcon from "../../../assets/edit.png";
import DeleteIcon from "../../../assets/delete.png";
import AddIcon from "../../../assets/add.png";
import EmojiIcon from "../../../assets/emoji.png";
import ExpandIcon from "../../../assets/expand.png";
import SearchIcon from "../../../assets/search.png";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  navy: "#1E3A5F",
  blue: "#2E5F9E",
  lightBlue: "#5B8EC4",
  pale: "#A8C4E0",
  accent: "#3B82F6",
};

const pieData = [
  { name: "Ótimo (9-10)", value: 8 },
  { name: "Bom (7-8)", value: 12 },
  { name: "Regular (5-6)", value: 5 },
  { name: "Baixo (<5)", value: 3 },
];
const PIE_COLORS = [COLORS.navy, COLORS.blue, COLORS.lightBlue, COLORS.pale];

const barData = [
  { bimestre: "Bim. 1", media: 7.8 },
  { bimestre: "Bim. 2", media: 8.2 },
  { bimestre: "Bim. 3", media: 7.1 },
  { bimestre: "Bim. 4", media: 8.6 },
];

const lineData = [
  { mes: "Mar", documentos: 2 },
  { mes: "Abr", documentos: 5 },
  { mes: "Mai", documentos: 3 },
  { mes: "Jun", documentos: 7 },
  { mes: "Jul", documentos: 4 },
  { mes: "Ago", documentos: 9 },
];

const postObservacao = async (observacaoData) => {
  try {
    const response = await api.post(`${API_BASE_URL}/api/observacao`, observacaoData);
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar observação:", error);
    throw error;
  }
};

function TeachersHub() {
  const [showCharts, setShowCharts] = useState(false);
  const [modal, setModal] = useState(null);
  const [breadcrumbs, setBreadcrumbs] = useState([
    {
      label: "Hub do Professor",
      onClick: () => {
        console.log("navegar para quick-access");
        setBreadcrumbs([{ label: "Hub do Professor" }]);
      },
    },
    { label: "Matematica 2026" },
  ]);

  const [documents, setDocuments] = useState([
    { id: 1, title: "Historia da arte", date: "28/21/20002", content: "" },
    { id: 2, title: "Historia da arte", date: "28/21/20002", content: "" },
    { id: 3, title: "Historia da arte", date: "28/21/20002", content: "" },
    { id: 4, title: "Historia da arte", date: "28/21/20002", content: "" },
    { id: 5, title: "Historia da arte", date: "28/21/20002", content: "" },
    { id: 6, title: "Historia da arte", date: "28/21/20002", content: "" },
    { id: 7, title: "Historia da arte", date: "28/21/20002", content: "" },
  ]);

  const [students, setStudents] = useState([
    // eslint-disable-line no-unused-vars
    {
      id: 1,
      name: "John Doe",
      bim1: 8,
      bim2: 8,
      bim3: null,
      bim4: null,
      media: 9,
    },
    {
      id: 2,
      name: "John Doe",
      bim1: 8,
      bim2: 8,
      bim3: null,
      bim4: null,
      media: 9,
    },
    {
      id: 3,
      name: "John Doe",
      bim1: 8,
      bim2: 8,
      bim3: null,
      bim4: null,
      media: 9,
    },
    {
      id: 4,
      name: "John Doe",
      bim1: 8,
      bim2: 8,
      bim3: null,
      bim4: null,
      media: 9,
    },
    {
      id: 5,
      name: "John Doe",
      bim1: 8,
      bim2: 8,
      bim3: null,
      bim4: null,
      media: 9,
    },
    {
      id: 6,
      name: "John Doe",
      bim1: 8,
      bim2: 8,
      bim3: null,
      bim4: null,
      media: 9,
    },
  ]);

  const openModal = (type, extra = {}) => setModal({ type, ...extra });
  const closeModal = () => setModal(null);

  return (
    <div className="teachers-hub-wrapper">
      <HeaderComponent />
      <div className="hub-container">
        <div className="teachers-header">
          <Breadcrumb items={breadcrumbs} />
          <h1>{breadcrumbs[breadcrumbs.length - 1]?.label || ""}</h1>
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
                        <button
                          className="action-btn edit-btn"
                          title="Editar documento"
                          onClick={() =>
                            openModal("editDocument", {
                              document: doc,
                              onSave: (updated) => {
                                setDocuments((prev) =>
                                  prev.map((d) =>
                                    d.id === updated.id
                                      ? { ...d, ...updated }
                                      : d,
                                  ),
                                );
                                closeModal();
                              },
                            })
                          }
                        >
                          <img
                            src={EditIcon}
                            alt="Editar"
                            width={18}
                            height={18}
                          />
                        </button>
                        <button
                          className="action-btn delete-btn"
                          title="Remover documento"
                          onClick={() =>
                            setDocuments((prev) =>
                              prev.filter((d) => d.id !== doc.id),
                            )
                          }
                        >
                          <img
                            src={DeleteIcon}
                            alt="Remover"
                            width={18}
                            height={18}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              className="add-document-btn"
              onClick={() =>
                openModal("addDocument", {
                  onSave: (newDoc) => {
                    setDocuments((prev) => [
                      ...prev,
                      {
                        id: prev.length + 1,
                        title: newDoc.title || "",
                        date: new Date().toLocaleDateString(),
                        content: newDoc.content || "",
                      },
                    ]);
                    closeModal();
                  },
                })
              }
            >
              <img src={AddIcon} alt="" width={20} height={20} />
              Adicionar Documento
            </button>
          </div>

          <div className="grades-container">
            <div className="card-flip-wrapper">
              <div
                className={`flip-card grades-card ${showCharts ? "card-exit" : "card-enter"}`}
              >
                <div className="grades-search-bar">
                  <input
                    type="text"
                    placeholder="Nome do Aluno"
                    className="grades-search-input"
                  />
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
                          <span
                            className="grade-cell grade-cell-clickable"
                            onClick={() =>
                              openModal("editGrade", {
                                student: {
                                  name: student.name,
                                  grade: student.bim1,
                                  bimestre: "1º Bimestre",
                                },
                              })
                            }
                          >
                            {student.bim1}
                            <img
                              src={EditIcon}
                              alt="editar"
                              width={12}
                              height={12}
                              className="grade-edit-icon"
                            />
                          </span>
                        </td>

                        <td>
                          <span
                            className="grade-cell grade-cell-clickable"
                            onClick={() =>
                              openModal("editGrade", {
                                student: {
                                  name: student.name,
                                  grade: student.bim2,
                                  bimestre: "2º Bimestre",
                                },
                              })
                            }
                          >
                            {student.bim2}
                            <img
                              src={EditIcon}
                              alt="editar"
                              width={12}
                              height={12}
                              className="grade-edit-icon"
                            />
                          </span>
                        </td>

                        <td>
                          <span
                            className="grade-cell grade-cell-clickable grade-empty"
                            onClick={() =>
                              openModal("launchGrade", {
                                student: {
                                  name: student.name,
                                  nextBim: "3º Bimestre",
                                },
                              })
                            }
                          >
                            -
                          </span>
                        </td>

                        <td>
                          <span
                            className="grade-cell grade-cell-clickable grade-empty"
                            onClick={() =>
                              openModal("launchGrade", {
                                student: {
                                  name: student.name,
                                  nextBim: "4º Bimestre",
                                },
                              })
                            }
                          >
                            -
                          </span>
                        </td>

                        <td className="grade-media">{student.media}</td>

                        <td className="actions-cell">
                          <button
                            className="action-btn"
                            title="Adicionar observação"
                            onClick={() =>
                              openModal("addObservation", {
                                student: { name: student.name, id: student.id },
                                onSave: async (data) => {
                                  try {
                                    await postObservacao({
                                      alunoId: data.student.id,
                                      professorId: 0,
                                      disciplinaId: 0,
                                      texto: data.text,
                                    });
                                    alert("Observação adicionada com sucesso!");
                                    closeModal();
                                  } catch (error) {
                                    alert(
                                      "Erro ao adicionar observação: " +
                                        error.message,
                                    );
                                  }
                                },
                              })
                            }
                          >
                            <img
                              src={EmojiIcon}
                              alt="Observação"
                              width={18}
                              height={18}
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div
                className={`flip-card charts-card ${showCharts ? "card-enter" : "card-exit"}`}
              >
                <div className="charts-header">
                  <h3>Insights da Turma</h3>
                  <span className="charts-subtitle">
                    28 alunos · Matemática 2026
                  </span>
                </div>

                <div className="charts-grid">
                  <div className="chart-block">
                    <p className="chart-label">Distribuição por Média Anual</p>
                    <ResponsiveContainer width="100%" height={160}>
                      <PieChart
                        margin={{ top: 6, right: 6, bottom: 6, left: 6 }}
                      >
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={48}
                          paddingAngle={1}
                          dataKey="value"
                        >
                          {pieData.map((_, index) => (
                            <Cell key={index} fill={PIE_COLORS[index]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v) => [`${v} alunos`]} />
                        <Legend
                          verticalAlign="bottom"
                          height={36}
                          wrapperStyle={{ fontSize: 12 }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="chart-block">
                    <p className="chart-label">Média da Turma por Bimestre</p>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} barSize={32}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="bimestre" tick={{ fontSize: 12 }} />
                        <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(v) => [`${v}`]} />
                        <Bar
                          dataKey="media"
                          fill={COLORS.navy}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="chart-block chart-block-full">
                    <p className="chart-label">Documentos Postados por Mês</p>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip formatter={(v) => [`${v} docs`]} />
                        <Line
                          type="monotone"
                          dataKey="documentos"
                          stroke={COLORS.navy}
                          strokeWidth={2.5}
                          dot={{ r: 4, fill: COLORS.navy }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="expand-btn"
              title={showCharts ? "Ver Notas" : "Ver Gráficos"}
              onClick={() => setShowCharts((prev) => !prev)}
            >
              <img src={ExpandIcon} alt="Expandir" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal genérico */}
      {modal && (
        <Modal
          type={modal.type}
          student={modal.student}
          document={modal.document}
          onClose={closeModal}
          onSave={modal.onSave || closeModal}
        />
      )}
    </div>
  );
}

export default TeachersHub;
