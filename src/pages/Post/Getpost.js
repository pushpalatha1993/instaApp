import React,{Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Getpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts:[],
            loading: true,
            error: null,
            userId:  null,
            newPostAdded: false,
        }
    }
    componentDidMount () {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            this.setState({error:'User ID not found in localStorage',loading:false})
            return;
        }
        fetch(`https://instaapp-np7g.onrender.com/api/post/user/${userId}` )
         .then(response => response.json())
         .then(data =>{
            console.log("fetched posts:",data)
            this.setState({posts:data,loading:false});
            
         })
          .catch(error => {
            this.setState({error: 'failed to fetch posts',loading: false})
          })
         }
         componentDidUpdate(prevProps) {
            console.log("componentDidUpdate called");
            const currentUserId = localStorage.getItem("userId");
            console.log("Fetched userid from localStorage:",currentUserId);
            if(this.props.newPostAdded && !prevProps.newPostAdded)  {
                console.log("detected new post added.Fecthing updated post....");
                 fetch(`https://instaapp-np7g.onrender.com/api/post/user/${currentUserId}`)
                .then((response) => response.json())
                console.log("Received response from API")
                .then(data =>{
                   console.log("Updated fetched posts:",data)
                   this.setState({posts:data,loading:false});
                   console.log("Resting newPostAdded flag in parent.....")
                   this.props.resetPostAdded();
                   })
                 .catch(error => {
                   this.setState({error: 'failed to fetch updated posts',loading: false})
                 })
                }  
            }
         

         render() {
            const {posts,loading,error} = this.state;
            if(loading) return <p> Loading post</p>
            if(error) return <p>{error}</p>
            return(
                <div className="container mt-4">
                    <h3
                    className="mb-4">All post</h3>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {posts.map((post)=>(
                            <div key={post._id} className="col">
                            <div className="card h-100 shadow-sm">
                              <img 
                              src={post.image || "https://via.placeholder.com"} 
                              className="card-img-top"
                              alt="placeholder"
                              style={{objectFit:"cover",height:"300px"}}
                              /> 
                              <div className="card-body">
                               <p className="card-text">{post.caption}</p>
                              </div>
                            </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
         }
         

        

}
