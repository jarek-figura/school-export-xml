export default function organizeStudents() {
  const students = this.props.students.filter(
    student => student.getElementsByTagName('username')[0].innerHTML.toLowerCase().includes(
      this.props.searchPhrase.toLowerCase()
    )
  );
  return students;
}