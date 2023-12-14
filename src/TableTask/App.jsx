import React from 'react'
import ReusableTable from './ReusableTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const data = [
    { id: 1, name: 'Anjali Singh', email: 'anjali.singh@hireraft.com', city: 'Bengalore', gender:'Female',  designation:'Hiring Recruiter', experience:'4 Years', salary:'8 LPA' },
    { id: 2, name: 'Rahul Madha', email: 'rahulmadha12@gmail.com', city: 'Haveri', gender:'Male', designation:'Senior Developer', salary:'9 LPA' , experience:'7 Years'},
    { id: 3, name: 'Kirankumar', email: 'itskirankumar18@gmail.com', city: 'Kerala', gender:'Male' , designation:'Front-End Developer', experience:'1 Years', salary:'4.5 LPA' },
    { id: 4, name: 'Neha Lokare ', email: 'nehalokare12@gmail.com', city: 'Mysore', gender:'Female', designation:'UI/UX Designer',  experience:'2 Years', salary:'6 LPA' },
    { id: 5, name: 'Pranav Janavi', email: 'janavi@gmail.com', city: 'Mumbai', gender:'Male' ,designation:'Back-End Developer',  experience:'6 Years', salary:'12 LPA' },
    { id: 6, name: 'Uday', email: 'uday@gmail.com', city: 'Pune', gender:'Male', designation:'React JS Developer' ,  experience:'5 Years', salary:'10 LPA'},
    { id: 7, name: 'Mallikarjun H', email: 'chintu@gmail.com', city: 'Hubli', gender:'Male',  designation:'React JS Developer' ,  experience:'3.5 Years', salary:' 7.6 LPA' },
    { id: 8, name: 'Ramesh Menasinhal', email: 'ramesh122@gmail.com', city: 'Hubli', gender:'Male',  designation:'UI/UX Developer' ,  experience:'4 Years', salary:' 15 LPA' },
    { id: 9, name: 'Rajesh valmiki', email: 'rajesh178@gmail.com', city: 'Bijapur', gender:'Male',  designation:'React JS Developer' ,  experience:'5 Years', salary:'2.5 LPA' },
    { id: 10, name: 'Manjunath I H', email: 'manju145@gmail.com', city: 'Raichur', gender:'Male',  designation:'React JS Developer' ,  experience:'2.5 Years', salary:' 3.5 LPA' },
    { id: 11, name: 'Arunkumar I H', email: 'arunkumar45@gmail.com', city: 'Hubli', gender:'Male',  designation:'Test Engineer' ,  experience:'2.5 Years', salary:' 3.5 LPA' },
    { id: 12, name: 'Janavi Advi', email: 'janviih@gmail.com', city: 'Bengalore', gender:'Female',  designation:'Informative Engineer', experience:'4 Years', salary:'8 LPA' },
    { id: 12, name: 'Karthik', email: 'karthik123@gmail.com', city: 'Bengalore', gender:'Male',  designation:'Hiring Recruiter', experience:'4 Years', salary:'8 LPA' },
  ];
  
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email ID' },
    { key: 'city', label: 'Location' },
    {key: 'gender', label: 'Gender'},
    {key:'designation', label:'Designation'},
    {key:'experience', label:'Experience'},
    {key:'salary', label:'Salary'}
  ];

const App = () => {
  return (
    <div >
    <h1 style={{textAlign:'center', marginTop:'50px' , backgroundColor:'powderblue'}}>Reusable Table Example</h1>
    < ReusableTable data={data} columns={columns} />
  </div>
  )
}

export default App
