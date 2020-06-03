import React, {Component} from 'react';
import axios from 'axios';
import './Coaches.css';
import image2 from '../../images/image2.jpg'

class Coaches extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: [{
                name: 'John Smith',
                position: 'Wide Recievers',
                picture: '',
                bio: 'John has been coaching football for three days and is arguable the most mediocre coach this sport has ever seen! We are unenthuiastically excited to have him forced to join our staff!'
            }],
            image: null
        }
    }

    fileUploader = event => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => reader.result;
        setTimeout(()=> console.log(reader.result.split(',')) , 1000)
        setTimeout(()=>this.setState({image: reader.result.split(',')}) , 1000)
        
    }
    uploadCoach(){
        axios.post('/api/addNewCoach', {base64String: this.state.image}).then(res =>{
            console.log(res.data)
            
        })
    }

    renderCoaches(){
        return this.state.data.map(coach =>{
            return(
                <div className="card card-width">
                    <div className="card-image waves-effect waves-block waves-light"> 
                        <img className="activator image-size" src={image2}></img>
                    </div>      
                    <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">{coach.name}<i className="material-icons right">more_vert</i></span>
                        <p>{coach.position}</p>
                    </div>  
                    <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">{coach.name}<i className="material-icons right">close</i></span>
                        <p>{coach.position}</p>
                        <p>{coach.bio}</p>
                    </div>
                    
                </div>
            )
        })
    }
    render(){
        return(
            <div className="container">
                This is the coaches Page
                {this.renderCoaches()}
                {/* <input type="file" onChange={(e)=>this.fileUploader(e)}></input> */}
                {/* <div>
                    <img className="test" src={this.state.image ? `data:image/jpeg;base64, ${this.state.image[1]}` : ''}></img>
                </div>
                <button onClick={()=>this.uploadCoach()}>Submit</button> */}
            </div>
        )
    }
}

export default Coaches