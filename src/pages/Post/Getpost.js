import React,{Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import previewModal from "./previewModal";
import { Modal, Button} from "react-bootstrap";
import CaptionModal from "../../Component/Modals/CaptionModal";
import { toast } from "react-toastify";


export default class Getpost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts:[],
            loading: true,
            error: null,
            userId:  null,
            newPostAdded: false,
            showModal:false,
            selectedImage: '',
            selectedCaption: '',
            isFromGetPost: false,
            showEditModal: false,
            editableCaption: '',
            showEditCaptionModal: false,
            selectedPost:null,
            currentUserId:'',
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
                console.error("Expected an array but got:",typeof data)
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
            handleImageSelect = (post) => {
                this.setState({ showModal:true, selectedPost: post,  selectedImage: post.imageUrl, selectedCaption: post.caption, isFromGetPost: true});
            };

            handleCloseModal = () => {
                this.setState({showModal: false,selectedPost:null});
            }; 

            handleBack = () => {
                console.log("Back button clicked");
                 this.setState({ showModal:false });
            }

            handleShare = () => {
                this.setState({showModal:false})
            }
           
            handleHide =() => this.setState({ showCaptionModal: false })
            handleCaptionText = (e) => this.setState({captionText: e.target.value})

            handleShowModal = (post) => {
                this.setState({showModal:true,
                    selectedPost:post,
                    selectedImage: post.imageUrl,
                    selectedCaption: post.caption,
                    isFromGetPost: true,
                    editableCaption: post.caption,
                })
            }
            removePostById = (postId) => {
                this.setState((prevState) => ({
                    posts: prevState.posts.filter(post => post._id !==postId)
                }))
            }
            handleEditClick = () =>{
                this.setState({ 
                    editableCaption:this.state.selectedPost.caption,
                    showEditCaptionModal: true,
                })
            }
            handleEditCaptionChange = (e) => {
                this.setState({editableCaption: e.target.value})
            }
            handleEditModalClose = () => {
                this.setState({ showEditModal: false})
            } 
            handleEditShare = async () => {
                const { selectedPost, editableCaption,currentUserId, posts} = this.state;
                
                if(!selectedPost || !selectedPost._id) {
                    console.error("No selected post selected for editing.");
                    toast.error("No post selected.")
                    return;
                }

                fetch(`https://instaapp-np7g.onrender.com/api/post/update/${selectedPost._id}`,{
                    method: 'PUT',
                    headers:{'Content-Type' : 'application/json'},
                    body:JSON.stringify({
                        caption:editableCaption,
                        userId: currentUserId,
                    })
                })
                .then((res) => {
                    if(!res.ok)throw new Error('Update failed');
                     return res.json();
                })
                .then((data) => {
                    toast.success("Caption updated successfully!");
                    this.setState((prevState) => ({
                        posts: prevState.posts.map((post) =>
                            post._id === selectedPost._id ? {...post, caption: editableCaption} : post
                        ),
                       showEditCaptionModal: false,
                    }))
                  
                })
                .catch((error) => {
                    console.error("Update error:",error);
                    toast.error("Failed to update caption. Please try again.")
                    // alert("Failed to update")
                })
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
                              onClick={() => this.handleImageSelect({_id, imageUrl,caption})}
                             /> 
                             <button
                                  className="btn btn-light position-absolute"
                                  style={{ top: "10px", right: "10px", zIndex: 10 }}
                                
                                  >
    
                                </button>
                             
                              <div className="card-body">
                               <p className="card-text">{caption}</p>
                              </div>
                            </div>
                            
                        ))}
                    </div>
                    <CaptionModal  postId={this.state.selectedPost?._id} selectedImage={this.state.selectedPost?.imageUrl} captionText={this.state.selectedCaption} handleBack={this.handleBack } handleHide={this.handleCloseModal } handleCaptionText={this.handleCaptionText} showCaptionModal={this.state.showModal} handleShare={this.handleShare}   isFromGetPost={this.state.isFromGetPost} onPostDeleted={this.removePostById} handleEdit={this.handleEditClick}/>
                    {/* Editable second Caption Modal */}
                    {this.state.showEditCaptionModal &&(
                      <CaptionModal 
                      postId={this.state.selectedPost?._id}
                      selectedImage={this.state.selectedPost?.imageUrl}
                      captionText={this.state.editableCaption}
                      handleBack={this.handleEditModalClose}
                      handleHide={() => this.setState({showEditCaptionModal:false})}
                      handleCaptionText={this.handleEditCaptionChange}
                      showCaptionModal={this.state.showEditCaptionModal}
                      handleEditShare={this.handleEditShare}
                      isFromGetPost={false}
                      onPostDeleted={this.removePostById}
                      readOnly={false}
                       />
                    )}
                    
                </div>
                 )
         }
         
         }
