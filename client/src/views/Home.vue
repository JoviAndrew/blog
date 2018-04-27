<template>
  <div id="home">
      <div class="row">
          <div class="mainBody col-9">
              <div class="col-12">
                  <div class="intro col-12">
                    <label class="headerMainPost">You have logged in as {{username}}</label>
                  </div>
                  <div class="posts" v-for="(post, index) in posts" :key="index">
                        <div class="postHeader">
                          <h3>{{post.header}}</h3>
                        </div>
                        <div class="postContent">
                            {{post.post_text}}
                        </div>
                        <div class="postBy">
                           Post by: <strong>{{post.username}}</strong> at: {{post.createdAt}}
                           <div class="udBtn" v-if="username == post.username">
                            <button class="btn btn-link" data-toggle="modal" data-target="#updateModal" v-on:click="setForUpdate(index)">Edit</button>
                            <button class="btn btn-link" v-on:click="deletePost(post._id)">Remove</button>
                           </div>
                        </div>
                  </div>
              </div>
            </div>

            <div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add Post</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <input type="text" placeholder="Header" v-model="post_header">
                                <textarea placeholder="Content..." id="" cols="30" rows="10" v-model="post_content"></textarea>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary" v-on:click="updatePost(post_id)" data-dismiss="modal">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

          <div class="sideMenu col-3">
              <button class="addNewPost btn btn-outline-primary mt-4" data-toggle="modal" data-target="#addpostModal">Add New Post!</button>
              <div class="profile mt-3">
                <label><strong>{{firstname}} {{lastname}}</strong></label>
              </div>
			  <div class="mt-2">
				  <label></label>
			  </div>

                <div class="modal fade" id="addpostModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Add Post</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <input type="text" placeholder="Header" v-model="post_header">
                                <textarea placeholder="Content..." id="" cols="30" rows="10" v-model="post_content"></textarea>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" class="btn btn-primary" v-on:click="addPost" data-dismiss="modal">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'home',
	data() {
		return{
			username: localStorage.getItem('username'),
			posts: null,
			post_content: '',
			post_header: '',
      post_id: '',
      lastname: localStorage.getItem('lastname'),
      firstname: localStorage.getItem('firstname')
		}  
	},
	computed: {
		orderedPost(){
			return _.orderBy(this.posts, ['createdAt'], ['desc'])
		}
	},
	created(){
		this.posts = null
		this.getAllPosts()
		this.checklogin()
	},
	methods: {
		checklogin(){
			let username = localStorage.getItem('username')
			if(!username){
				this.$store.commit('changeStatusFalse')
			}else{
        this.$store.commit('changeStatusTrue')
        this.$store.dispatch('')
			}
		},
		addPost(){
			let header = this.post_header
			let content = this.post_content
			let self = this
			let token = localStorage.getItem('token')
			let username = localStorage.getItem('username')

			axios.post('http://localhost:3000/home/post', 
			{
				header: header,
				postText: content,
				username: username
			},
			{headers: {token: token}}
			)
			.then(function(response){
				alert(response.data.message)
				console.log(response.data)
				self.getAllPosts()
				self.reset
			})
			.catch(function(err){
				alert('Something went wrong when adding post!')
				console.log(err)
			})
		},
		reset(){
				this.post_content = ''
				this.post_header = ''
				this.post_id = ''
		},
		getAllPosts(){
			let self = this
			let token = localStorage.getItem('token')
			axios.get('http://localhost:3000/home/show', {headers: {token: token}})
			.then(function(postData){
				self.posts = postData.data.data                
			})
			.catch(function(err){
				alert('Error has occured during retrival of data')
				console.log(err)
			})
		},
		sendToHome(){
			this.$router.push('/home')
		},
		deletePost(id){
			let token = localStorage.getItem('token');
			let self = this
			axios.delete(`http://localhost:3000/home/delete/${id}`, {headers: {token: token}})
			.then(function(response){
				alert(response.data.message)
				self.getAllPosts()
			})
			.catch(function(err){
				alert('Something went wrong while deleting a post')
				console.log(err)
			})
		},
		updatePost(id){
			let content = this.post_content
			let header = this.post_header
			let token = localStorage.getItem('token')
			let self = this

			axios.put(`http://localhost:3000/home/update/${id}`, 
			{
					header: header,
					postText: content,
			}, {headers: {token: token}
			})
			.then(function(response){
				alert(response.data.message)
				self.getAllPosts()
			})
			.catch(function(err){
				alert('Something went wrong when updating the post!')
				console.log(err)
			})
						
		},
		setForUpdate(index){
			this.post_header = this.posts[index].header
			this.post_content = this.posts[index].post_text
			this.post_id = this.posts[index]._id
		}
	}
}
</script>

<style>
button.btn.btn-link{
    font-size: 11px
}
.addNewPost{
    margin: 2%
}
.modal-body{
    display: flex;
    flex-direction: column;
}
input{
    margin: 1%
}
textarea{
    margin: 1%;
    resize: none
}
h3{
    text-decoration: underline
}

.postBy{
    text-align: right;
    color: grey;
    margin: 2%;
    font-size: 12px
}
.intro{
    text-align: right;
    color: grey;
    margin:2%
}
.posts{
    border: 1px solid grey;
    border-radius: 10px

}
h2{
    text-align: left;
    margin-left: 2%;
    font-weight: bold
}

.mainBody {
    border: 1px solid rgb(228, 228, 228);
    border-radius: 25px
}
.sideMenu{
    border: 1px solid rgb(228, 228, 228);
    border-radius: 25px
}
</style>
