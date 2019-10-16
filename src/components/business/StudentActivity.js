import React, { Component } from 'react';
import { withXML } from '../contexts/XML';
import './Students.css';
import Semester from './Semester';
import SubjectSearch from './SubjectSearch';
import ClassSearch from './ClassSearch';
import TeacherSearch from './TeacherSearch';

import Button from '@material-ui/core/Button';
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
import Undo from '@material-ui/icons/Undo';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

export class StudentActivity extends Component {

  handleResetStudent = () => { this.props.handleStudentClick(null) };

  handleClick = () => { this.props.handleShowStudentPresences(!this.props.showStudentPresences) };

  render() {
    const clickedId = this.props.studentClickedId;
    const userName = clickedId ? `${this.props.studentName[clickedId]} ${this.props.studentSurname[clickedId]} - ${this.props.studentUserName[clickedId]}` : 'Wszyscy';
    const semester = this.props.semester && Array.from(this.props.semester);

    let showPresencesText = !this.props.showStudentPresences ? 'Pokaż obecności' : 'Schowaj obecności';

    return (
      <span className='school'>
        <Card className='school-top' style={{ backgroundColor: '#ffeeff' }}>
          <CardContent>
            <Box fontSize='h5.fontSize' mb={2}>Oceny i obecności uczniów</Box>
            <Box fontSize='h6.fontSize' mb={2}>Uczeń: <span style={{ color: `${clickedId ? '#F2105A' : '#4054B2'}` }}>{userName}</span></Box>
            <Button
              variant="contained"
              color="primary"
              component="span"
              onClick={this.handleClick}
            >
              {!this.props.showStudentPresences ? <Add /> : <Remove />}&nbsp;{`${showPresencesText}`}
            </Button> {clickedId 
              ? <Button
                  style={{ marginLeft: '10px' }}
                  variant="contained"
                  color="secondary"
                  component="span"
                  onClick={this.handleResetStudent}
                >
                  <Undo />&nbsp;Pokaż wszystkich uczniów
                </Button>
              : null
            }
          </CardContent>
          <Divider orientation='vertical' variant='middle' />
          <span>
            <div><ClassSearch/></div>
            <div><SubjectSearch/></div>
            <div><TeacherSearch/></div>
          </span>
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