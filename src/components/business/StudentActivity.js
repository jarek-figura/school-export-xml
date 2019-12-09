import React, { PureComponent } from 'react';
import { withXML } from '../contexts/XML';
import './Students.css';
import Semester from './Semester';
import SearchForm from './SearchForm';

import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Person from '@material-ui/icons/Person';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export class StudentActivity extends PureComponent {

  handleResetStudent = () => {
    this.props.handleStudentClick(null)
  };
  handlePresencesClick = () => {
    this.props.handleShowStudentPresences(!this.props.showStudentPresences);
    this.props.handleShowLessonEntries(false);
  };
  handleEntriesClick = () => {
    this.props.handleShowLessonEntries(!this.props.showLessonEntries);
    this.props.handleShowStudentPresences(false);
  };

  render() {

    const clickedId = this.props.studentClickedId;
    const userName = clickedId ? `${this.props.studentName[clickedId]} ${this.props.studentSurname[clickedId]} - ${this.props.studentUserName[clickedId]}` : 'Wszyscy';
    const semester = this.props.semester && Array.from(this.props.semester);

    return (
      <span className='school'>
        <Card className='school-top' style={{ backgroundColor: '#ffeeff' }}>
          <CardContent>
            <Box fontSize='h5.fontSize' mb={2}>Oceny i obecności uczniów</Box>
            <Box fontSize='h6.fontSize' mb={2}>Uczeń: <span style={{ color: `${clickedId ? '#F2105A' : '#4054B2'}` }}><Person style={{ marginBottom: '-4px' }} /> {userName}</span></Box>
            <Button
              variant="contained"
              color={`${this.props.showStudentPresences ? 'primary' : 'default'}`}
              component="span"
              onClick={this.handlePresencesClick}
            >
              {!this.props.showStudentPresences ? <Visibility /> : <VisibilityOff />}&nbsp;Obecności
            </Button> <Button
              style={{ marginLeft: '5px' }}
              variant="contained"
              color={`${this.props.showLessonEntries ? 'primary' : 'default'}`}
              component="span"
              onClick={this.handleEntriesClick}
            >
              {!this.props.showLessonEntries ? <Visibility /> : <VisibilityOff />}&nbsp;Tematy&nbsp;lekcji
            </Button> {clickedId 
              ? <Button
                  style={{ marginLeft: '5px' }}
                  variant="contained"
                  color="secondary"
                  component="span"
                  onClick={this.handleResetStudent}
                >
                  <Person />&nbsp;Pokaż wszystkich
                </Button>
              : null
            }
          </CardContent>
          <Box mt={3}>
            <div>
              <SearchForm
                icon={<SearchIcon />}
                width={'170px'}
                label={'Klasa'}
                placeholder={'Klasa'}
                startAdornment={true}
                updateSearchFunction={this.props.updateSearchClass}
              /> <SearchForm
                icon={<SearchIcon />}
                width={'170px'}
                label={'Przedmiot'}
                placeholder={'Przedmiot'}
                startAdornment={true}
                updateSearchFunction={this.props.updateSearchSubject}
              />
            </div>
            <div>
              <SearchForm
                icon={<SearchIcon />}
                width={'170px'}
                label={'Nauczyciel'}
                placeholder={'Imię'}
                startAdornment={true}
                updateSearchFunction={this.props.updateSearchTeacherName}
              /> <SearchForm
                icon={<SearchIcon />}
                width={'170px'}
                label={'Nauczyciel'}
                placeholder={'Nazwisko'}
                startAdornment={true}
                updateSearchFunction={this.props.updateSearchTeacherSurname}
              />
            </div>
          </Box>
        </Card>
        <div className='semester-column'>
        {
          semester && semester.map(
            (sem, idx) => (
              <div key={idx}>
                <Semester sem={sem} />
              </div>
            )
          )
        }
        </div>
      </span>
    )
  }
}

export default withXML(StudentActivity);