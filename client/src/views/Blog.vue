<template>
  <div id="blog">
    <div class="row">
      <div class="mainBody col-9">
        <div class="col-12">
          <div class="posts" v-for="(post, index) in posts" :key="index">
              <div class="postHeader mt-3">
                <h3>{{post.header}}</h3>
              </div>
              <div v-if="post.image !== null" class="postImage mt-3">
                <img :src="post.image">
              </div>
              <div class="postContent">
                  {{post.post_text}}
              </div>
              <div class="postBy">
                  Post by: <strong>{{post.username}}</strong> at: {{post.createdAt.getFullYear()}}/{{post.createdAt.getMonth()}}/{{post.createdAt.getDate()}}
              </div>
          </div>
        </div>
      </div>
      <div class="sideMenu col-3">
        <router-link class="addNewPost btn btn-outline-success mt-4" to="/register">Join Now!</router-link>
      <div class="profile mt-3">
        <label><strong>{{posts[0].user.firstname}} {{posts[0].user.lastname}}</strong></label>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'blog',
	computed:{ 
    ...mapState(['posts'])},
	created(){
    this.$store.dispatch('getPostsByAuthor', this.$route.params.id)
	},
}
</script>

<style scoped>
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
.postImage {
  margin: 3%;
}
img {
  border: 2px solid rgb(3, 154, 255);
  border-radius: 4px;
  padding: 10px;
  width: 50%;
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
  border-radius: 10px;
  margin: 2% 0%
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
