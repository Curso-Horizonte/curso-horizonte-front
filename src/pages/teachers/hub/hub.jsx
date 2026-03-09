import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../../../components/header/header";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import Modal from "../../../components/modal/Modal";
import "./hub.css";
import API_BASE_URL from "../../../config";
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

function TeachersHub() {
  const { disciplinaNome: slugNome } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const disciplinaNome =
    location.state?.disciplinaNome || slugNome || "Disciplina";
  const disciplinaId = location.state?.disciplinaId;

  const [showCharts, setShowCharts] = useState(false);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [professorDisciplinaId, setProfessorDisciplinaId] = useState(null);
  const [documents, setDocuments] = useState([]);

  const breadcrumbs = [
    {
      label: "Hub do Professor",
      onClick: () => {
        navigate("/");
      },
    },
    { label: disciplinaNome },
  ];

  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getProfessorDisciplinaId = async (professorId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/api/professor_disciplina/professor/${professorId}`,
      );
      if (response.data.length > 0) {
        const disciplinaEncontrada = response.data.find(
          (disciplina) => disciplina.disciplinaId === Number(disciplinaId),
        );
        if (disciplinaEncontrada) {
          setProfessorDisciplinaId(disciplinaEncontrada.id);
        }
      } else {
        console.error("Nenhuma disciplina encontrada para o professor.");
      }
    } catch (error) {
      console.error("Erro ao buscar disciplina do professor:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDocumentos = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_BASE_URL}/api/documento/get`);
      const documentosFiltrados = response.data.filter(
        (doc) => doc.professorDisciplinaId === professorDisciplinaId,
      );

      setDocuments(documentosFiltrados);
    } catch (error) {
      console.error("Erro ao buscar documentos do professor:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAlunosByDisciplina = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/aluno_disciplina`);
      const alunosFiltrados = response.data
        .filter((item) => item.disciplinaId === Number(disciplinaId))
        .map((item) => ({
          id: item.alunoId,
          alunoDisciplinaId: item.id,
          name: item.alunoNome,
          bim1: null,
          bim2: null,
          bim3: null,
          bim4: null,
          media: null,
        }));
      setStudents(alunosFiltrados);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    } finally {
      setLoading(false);
    }
  };

  const getNotasByDisciplina = async () => {
    try {
      setLoading(true);

      const requests = students.map((student) =>
        axios.get(
          `${API_BASE_URL}/api/nota/aluno/${student.id}/disciplina/${disciplinaId}`,
        ),
      );

      const responses = await Promise.all(requests);

      const studentsWithGrades = students.map((student, index) => {
        const notasAluno = responses[index].data || [];

        let bim1 = null;
        let bim2 = null;
        let bim3 = null;
        let bim4 = null;

        notasAluno.forEach((nota) => {
          if (nota.bimestre === 1) bim1 = nota.valor;
          if (nota.bimestre === 2) bim2 = nota.valor;
          if (nota.bimestre === 3) bim3 = nota.valor;
          if (nota.bimestre === 4) bim4 = nota.valor;
        });

        const notasValidas = [bim1, bim2, bim3, bim4].filter((n) => n !== null);

        const media =
          notasValidas.length > 0
            ? (
                notasValidas.reduce((acc, n) => acc + n, 0) /
                notasValidas.length
              ).toFixed(1)
            : null;

        return {
          ...student,
          bim1,
          bim2,
          bim3,
          bim4,
          media,
        };
      });

      setStudents(studentsWithGrades);
    } catch (error) {
      console.error("Erro ao buscar notas:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteDocumentos = async (documentId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${API_BASE_URL}/api/documento/remove/${documentId}`,
      );
      if (response.status === 200) {
        alert("Documento deletado com sucesso!");
        return true;
      }
    } catch (error) {
      console.error("Erro ao deletar documento:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const professorId = user?.professorId;

    getAlunosByDisciplina();
    if (professorId) {
      getProfessorDisciplinaId(professorId);
    }
    if (professorDisciplinaId) {
      getDocumentos();
    }

    if (students.length > 0) {
      getNotasByDisciplina();
    }
  }, [disciplinaId, professorDisciplinaId, students.length]); // eslint-disable-line react-hooks/exhaustive-deps

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
                      <td>{doc.titulo}</td>
                      <td>{new Date(doc.data).toLocaleDateString("pt-BR")}</td>
                      <td className="actions-cell">
                        <button
                          className="action-btn edit-btn"
                          title="Editar documento"
                          onClick={() =>
                            openModal("editDocument", {
                              document: doc,
                              teacher: { professorDisciplinaId },
                              onSuccess: () => getDocumentos(),
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
                            deleteDocumentos(doc.id).then((success) => {
                              if (success) {
                                getDocumentos();
                              }
                            })
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
                  teacher: { professorDisciplinaId },
                  onSuccess: () => getDocumentos(),
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    {loading ? (
                      <tr>
                        <td
                          colSpan="7"
                          style={{ textAlign: "center", padding: "20px" }}
                        >
                          Carregando alunos...
                        </td>
                      </tr>
                    ) : filteredStudents.length === 0 ? (
                      <tr>
                        <td
                          colSpan="7"
                          style={{ textAlign: "center", padding: "20px" }}
                        >
                          {searchTerm
                            ? "Nenhum aluno encontrado com esse nome."
                            : "Nenhum aluno encontrado para esta disciplina."}
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student) => (
                        <tr key={student.id}>
                          <td className="student-name">{student.name}</td>

                          <td>
                            {student.bim1 !== null ? (
                              <span
                                className="grade-cell grade-cell-clickable"
                                onClick={() =>
                                  openModal("editGrade", {
                                    student: {
                                      name: student.name,
                                      grade: student.bim1,
                                      bimestre: 1,
                                      bimestreLabel: "1º Bimestre",
                                      alunoDisciplinaId: student.alunoDisciplinaId,
                                    },
                                    onSuccess: () => getNotasByDisciplina(),
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
                            ) : (
                              <span
                                className="grade-cell grade-cell-clickable grade-empty"
                                onClick={() =>
                                  openModal("launchGrade", {
                                    student: {
                                      name: student.name,
                                      bimestre: 1,
                                      bimestreLabel: "1º Bimestre",
                                      alunoDisciplinaId: student.alunoDisciplinaId,
                                    },
                                    onSuccess: () => getNotasByDisciplina(),
                                  })
                                }
                              >
                                -
                              </span>
                            )}
                          </td>

                          <td>
                            {student.bim2 !== null ? (
                              <span
                                className="grade-cell grade-cell-clickable"
                                onClick={() =>
                                  openModal("editGrade", {
                                    student: {
                                      name: student.name,
                                      grade: student.bim2,
                                      bimestre: 2,
                                      bimestreLabel: "2º Bimestre",
                                      alunoDisciplinaId: student.alunoDisciplinaId,
                                    },
                                    onSuccess: () => getNotasByDisciplina(),
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
                            ) : (
                              <span
                                className="grade-cell grade-cell-clickable grade-empty"
                                onClick={() =>
                                  openModal("launchGrade", {
                                    student: {
                                      name: student.name,
                                      bimestre: 2,
                                      bimestreLabel: "2º Bimestre",
                                      alunoDisciplinaId: student.alunoDisciplinaId,
                                    },
                                    onSuccess: () => getNotasByDisciplina(),
                                  })
                                }
                              >
                                -
                              </span>
                            )}
                          </td>

                          <td>
                            {student.bim3 !== null ? (
                              <span
                                className="grade-cell grade-cell-clickable"
                                onClick={() =>
                                  openModal("editGrade", {
                                    student: {
                                      name: student.name,
                                      grade: student.bim3,
                                      bimestre: 3,
                                      bimestreLabel: "3º Bimestre",
                                      alunoDisciplinaId: student.alunoDisciplinaId,
                                    },
                                    onSuccess: () => getNotasByDisciplina(),
                                  })
                                }
                              >
                                {student.bim3}
                                <img
                                  src={EditIcon}
                                  alt="editar"
                                  width={12}
                                  height={12}
                                  className="grade-edit-icon"
                                />
                              </span>
                            ) : (
                              <span
                                className="grade-cell grade-cell-clickable grade-empty"
                                onClick={() =>
                                  openModal("launchGrade", {
                                    student: {
                                      name: student.name,
                                      bimestre: 3,
                                      bimestreLabel: "3º Bimestre",
                                      alunoDisciplinaId: student.alunoDisciplinaId,
                                    },
                                    onSuccess: () => getNotasByDisciplina(),
                                  })
                                }
                              >
                                -
                              </span>
                            )}
                          </td>

                          <td>
                            {student.bim4 !== null ? (
                              <span
                                className="grade-cell grade-cell-clickable"
                                onClick={() =>
                                  openModal("editGrade", {
                                    student: {
                                      name: student.name,
                                      grade: student.bim4,
                                      bimestre: 4,
                                      bimestreLabel: "4º Bimestre",
                                      alunoDisciplinaId: student.alunoDisciplinaId,
                                    },
                                    onSuccess: () => getNotasByDisciplina(),
                                  })
                                }
                              >
                                {student.bim4}
                                <img
                                  src={EditIcon}
                                  alt="editar"
                                  width={12}
                                  height={12}
                                  className="grade-edit-icon"
                                />
                              </span>
                            ) : (
                              <span
                                className="grade-cell grade-cell-clickable grade-empty"
                                onClick={() =>
                                  openModal("launchGrade", {
                                    student: {
                                      name: student.name,
                                      bimestre: 4,
                                      bimestreLabel: "4º Bimestre",
                                      alunoDisciplinaId: student.alunoDisciplinaId,
                                    },
                                    onSuccess: () => getNotasByDisciplina(),
                                  })
                                }
                              >
                                -
                              </span>
                            )}
                          </td>

                          <td className="grade-media">
                            {student.media ?? "-"}
                          </td>

                          <td className="actions-cell">
                            <button
                              className="action-btn"
                              title="Adicionar observação"
                              onClick={() =>
                                openModal("addObservation", {
                                  student: {
                                    name: student.name,
                                    id: student.id,
                                    disciplinaId: Number(disciplinaId),
                                  },
                                  // onSave: async (data) => {
                                  //   try {
                                  //     await postObservacao({
                                  //       alunoId: data.student.id,
                                  //       professorId: 0,
                                  //       disciplinaId: 0,
                                  //       texto: data.text,
                                  //     });
                                  //     alert("Observação adicionada com sucesso!");
                                  //     closeModal();
                                  //   } catch (error) {
                                  //     alert(
                                  //       "Erro ao adicionar observação: " +
                                  //         error.message,
                                  //     );
                                  //   }
                                  // },
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
                      ))
                    )}
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
          teacher={modal.teacher}
          document={modal.document}
          onClose={closeModal}
          onSave={modal.onSave || closeModal}
          onSuccess={modal.onSuccess}
        />
      )}
    </div>
  );
}

export default TeachersHub;
