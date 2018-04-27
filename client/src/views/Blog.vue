<template>
  <div id="blog">
      <div class="row">
          <div class="mainBody col-9">
              <div class="col-12">
                  <div class="posts" v-for="(post, index) in posts" :key="index">
                        <div class="postHeader">
                          <h3>{{post.header}}</h3>
                        </div>
                        <div class="postContent">
                            {{post.post_text}}
                        </div>
                        <div class="postBy">
                           Post by: <strong>{{post.username}}</strong> at: {{post.createdAt}}
                        </div>
                  </div>
              </div>
            </div>

          <div class="sideMenu col-3">
              <button class="addNewPost btn btn-outline-success mt-4" @click="goToRegister">Join Now!</button>
            <div class="profile mt-3">
              <label><strong>{{posts[0].user.firstname}} {{posts[0].user.lastname}}</strong></label>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters } from 'vuex'

export default {
	name: 'blog',
	data() {
		return{
      posts: []
		}  
	},
	computed:{ 
    ...mapState([
    'author'
  ])},
	created(){
		this.posts = []
    this.getPostsByAuthor()
    console.log(this.posts)
	},
	methods: {

		getPostsByAuthor(){
      let userId = this.$route.params.id
			let self = this
			let token = localStorage.getItem('token')
			axios.get(`http://35.197.131.176/home/show/${userId}`)
			.then(function(postData){
				self.posts = postData.data.data                
			})
			.catch(function(err){
				alert('Error has occured during retrival of data')
				console.log(err)
			})
    },
    goToRegister(){
      this.$router.push('/register')
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
