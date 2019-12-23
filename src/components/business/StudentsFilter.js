import * as L from 'list';

export default function filterStudents() {

  let adres;
  let personalData;
  const students = this.props.students
  console.log(students);
  // const students = this.props.students.filter(
  //   student => student.querySelector('username').innerHTML.toLowerCase().includes(
  //     this.props.searchUserName.toLowerCase()
  //   )
  // ).filter(
  //   student => {
  //     return (
  //       this.props.searchName === '' || (
  //         personalData = student.querySelector('personal_data').innerHTML,
  //         adres = personalData !== '' && 'adres' in JSON.parse(personalData) ? JSON.parse(personalData).adres : null,
  //         adres && 'name' in adres && adres.name.toLowerCase().includes(
  //           this.props.searchName.toLowerCase()
  //         )
  //       )
  //     )
  //   }
  // ).filter(
  //   student => {
  //     return (
  //       this.props.searchSurname === '' || (
  //         personalData = student.querySelector('personal_data').innerHTML,
  //         adres = personalData !== '' && 'adres' in JSON.parse(personalData) ? JSON.parse(personalData).adres : null,
  //         adres && 'surname' in adres && adres.surname.toLowerCase().includes(
  //           this.props.searchSurname.toLowerCase()
  //         )
  //       )
  //     )
  //   }
  // );

  return students;
}