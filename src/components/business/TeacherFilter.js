export default function filterTeachers(subjects, teacherName, teacherSurname, searchTeacherName, searchTeacherSurname) {

  let teacher = '';
  let teachersTable = [];
  subjects = subjects.filter(
    sbj => (
      // eslint-disable-next-line
      teachersTable = Array.from(sbj.querySelector('teachers').querySelectorAll('teacher')),
      teachersTable && teachersTable.filter(
        teach => (
          // eslint-disable-next-line
          teacher = teacherName[teach.querySelector('id').innerHTML],
          teacher && teacher.toLowerCase().includes(searchTeacherName.toLowerCase())
        )
      ).length
    )
  ).filter(
    sbj => (
      // eslint-disable-next-line
      teachersTable = Array.from(sbj.querySelector('teachers').querySelectorAll('teacher')),
      teachersTable && teachersTable.filter(
        teach => (
          // eslint-disable-next-line
          teacher = teacherSurname[teach.querySelector('id').innerHTML],
          teacher && teacher.toLowerCase().includes(searchTeacherSurname.toLowerCase())
        )
      ).length
    )
  );

  return subjects;
}