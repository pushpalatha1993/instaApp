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
            console.log("API returned data:",data)
            if(Array.isArray(data)) {
                this.setState({posts:data,loading:false});
            }else {
                console.error("Expected an array but got:",typeof dada)
                this.setState({error:"Invalid data format",loading:false})
            }
           
            
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
                // console.log("Received response from API")
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
            console.log("post to render:",posts)
            posts.forEach(post =>{
                console.log("image src for post:",post)
                // console.log("posted imageURL:",image)
            })
            
            return(
                <div className="container mt-4">
                    <h3 className="mb-4">All post</h3>
                    <div>
                        {posts.map(({_id,caption,imageUrl,user})=>(
                            <div key={_id} className="card mb-4 shadow-sm">
                            
                              <img 
                              src={imageUrl}
                            //   src="https://plus.unsplash.com/premium_photo-1681290358247-c160fc097bdb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGxhbnR8ZW58MHx8MHx8fDA%3D" 
                              className="card-img-top"
                              alt="Post"
                              style={{objectFit:"cover",height:"300px",width:"100%",objectFit: "cover", borderRadius:"8px" }}
                              /> 
                              <div className="card-body">
                               <p className="card-text">{caption}</p>
                              </div>
                            </div>
                            
                        ))}
                    </div>
                </div>
            )
         }
         

        

}
