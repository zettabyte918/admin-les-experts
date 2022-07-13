const filteredStudentsGloabl = (students, value) => {
  if (value === "") return students;
  else {
    let filtredStudentsByName = students.filter((student) => {
      return student.name_eleve.toLowerCase().includes(value.toLowerCase());
    });
    let filtredStudentsByGroupe = students.filter((student) => {
      return student.groupe.nom.toLowerCase().includes(value.toLowerCase());
    });
    let filtredStudentsByPack = students.filter((student) => {
      return student.pack.nom.toLowerCase().includes(value.toLowerCase());
    });
    let filtredStudentsByTel = students.filter((student) => {
      return student.tel.toLowerCase().includes(value.toLowerCase());
    });
    let arr = [
      ...filtredStudentsByName,
      ...filtredStudentsByGroupe,
      ...filtredStudentsByPack,
      ...filtredStudentsByTel,
    ];
    return arr.filter(
      (v, i, a) =>
        a.findIndex((v2) => ["tel"].every((k) => v2[k] === v[k])) === i
    );
  }
};

const filteredStudentsByNiveau = (students, value) => {
  value === ""
    ? students
    : students.filter((student) => {
        return student.name_eleve.toLowerCase().includes(value.toLowerCase());
      });
};

const filteredStudentsByGroup = (students, value) => {
  value === ""
    ? students
    : students.filter((student) => {
        return student.groupe.nom.toLowerCase().includes(value.toLowerCase());
      });
};

const filteredStudentsByPack = (students, value) => {
  value === ""
    ? students
    : students.filter((student) => {
        return student.pack.nom.toLowerCase().includes(value.toLowerCase());
      });
};

const filteredStudentsByTel = (students, value) => {
  value === ""
    ? students
    : students.filter((student) => {
        return student.tel.toLowerCase().includes(value.toLowerCase());
      });
};

export {
  filteredStudentsGloabl,
  filteredStudentsByNiveau,
  filteredStudentsByGroup,
  filteredStudentsByPack,
  filteredStudentsByTel,
};
