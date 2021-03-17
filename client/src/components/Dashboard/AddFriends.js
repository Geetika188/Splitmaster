import React from 'react';
import "../../styles/Dashboard.css";
import FriendList from './FriendList';
import Grouplist from './Grouplist';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import { serverIp, serverPort } from '../config';
import  Grouptransaction  from './Grouptransaction';
import { Route, Switch,Link } from 'react-router-dom';
    
    
class AddFriends extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          registeredStudents: [],
          displayedContacts :[],
          
        };

        this.returnRegisteredStudents = this.returnRegisteredStudents.bind(this);
     //   this.showGroup = this.showGroup.bind(this);
     this.searchHandler = this.searchHandler.bind(this);
      }

    componentDidMount() {
        axios.post(`${serverIp}:${serverPort}/getStudentsRegisteredInAEvent`, { email: localStorage.getItem('email_current') })
          .then((response) => {
            console.log('Response data in componentDidMount');
            console.log(response.data);
            //get invite email no 
            this.setState({
              registeredStudents: response.data,
              displayedContacts: response.data,
            });
          }).catch((err) => {
            console.log(`Error in componentDidMount of RegisteredStudents: ${err}`);
            window.alert('Error in connecting to server');
          });
      }
    
    searchHandler (event) {
        let searcjQery = event.target.value.toLowerCase();
        const values =[];
        this.state.registeredStudents.map((eachStudent) => {
               values.push(eachStudent.groupname);
        });
        console.log(values);
           this.displayedContacts = this.state.registeredStudents.filter((el) => {
              let searchValue = el.groupname.toLowerCase();
              return searchValue.indexOf(searcjQery) !== -1;
            })
        this.setState({
            registeredStudents : this.displayedContacts
        })
      }

      returnRegisteredStudents() {
        return this.state.registeredStudents.map((eachStudent) => {
          // let imgSrc = `${serverIp}:${serverPort}/default.png`;
          // if (eachStudent.profile_picture_url !== '') {
          //   imgSrc = `${serverIp}:${serverPort}/${eachStudent.profile_picture_url}`;
          // }
          return (
            <div>
               
               <Link to={`/transactionma:${eachStudent.groupname}`}> <span>{eachStudent.groupname} </span></Link>
               
                <Route path={`/transactionma:${eachStudent.groupname}`} component={Grouptransaction}/> 
                   
                  
            </div>
          );
    
        });
           
              
      }



render()
{
    return(
        <div className = "AddFriend">
         


         <div className = "content">
          
         <NavLink to = "/RecentActivity"><button className = "logoutbtn">Recent Activity</button></NavLink>

         <div className = "friendHeader" >
            <label htmlFor="">FRIENDS</label>
            {/* <button onClick = {props.friend} className = "AddFrnd float-right">+Add</button> */}
          
         </div>
         <div className = "Friend_List">
               <FriendList/>
         </div>

         <div className = "friendHeader" >
            <label htmlFor="">GROUPS</label>
            <NavLink to = "/Groups"><button className = "logoutbtn">+Add</button></NavLink>
          
         </div>
         <input type="text" classNAme="search" onChange={this.searchHandler}/>
         <div className = "Friend_List">
         <div>
         <ul>
                      <li className="friendlist">
                        <i class="fas fa-user"/>
                        
                        {this.returnRegisteredStudents()}
                        
                        </li>
         
         
         </ul>
         
         
         </div>
         </div>
         

         </div>

        </div>
    )
}
}
export default AddFriends;