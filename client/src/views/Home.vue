<template>
  <div id="home">
    <div class="row">
      <div class="mainBody col-9">
        <div class="col-12">
            <div class="intro col-12">
              <label class="headerMainPost">You have logged in as {{username}}</label>
            </div>
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
                  Posted by: <strong>{{post.username}}</strong> at: {{post.createdAt.getFullYear()}}/{{post.createdAt.getMonth()}}/{{post.createdAt.getDate()}}
                  <div class="udBtn" v-if="username == post.username">
                  <button class="btn btn-link" data-toggle="modal" data-target="#updateModal" v-on:click="setForUpdate(index)">Edit</button>
                  <button class="btn btn-link" v-on:click="deletePost(post._id)">Remove</button>
                  </div>
                </div>
            </div>
        </div>
      </div>
      <!-- Update Modal -->
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
              <input class="form-control" type="text" placeholder="Header" v-model="post_header">
              <textarea class="form-control" placeholder="Content..." id="" cols="30" rows="10" v-model="post_content"></textarea>
              <label>Image:</label>
              <input class="form-control" type="file" ref="fileUpdate" @change="onFilePickedUpdate" accept="image/*">
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
        <!-- Add Modal -->
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
                <input type="text" class="form-control" placeholder="Header" v-model="post_header">
                <textarea class="form-control" placeholder="Content..." id="" cols="30" rows="10" v-model="post_content"></textarea>
                <label>Image:</label>
                <input class="form-control" type="file" ref="file" @change="onFilePicked" accept="image/*">
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
import swal from 'sweetalert'
import { mapState } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      username: localStorage.getItem('username'),
      post_content: '',
      post_header: '',
      post_id: '',
      lastname: localStorage.getItem('lastname'),
      firstname: localStorage.getItem('firstname'),
      file: ''
    }
  },
  computed: {
    ...mapState(['posts'])
  },
  beforeCreate () {
    if (!localStorage.getItem('token')) {
      this.$store.dispatch('getAllPosts', '')
      this.$router.push('/')
    } else {
      this.$store.dispatch('getAllPosts', localStorage.getItem('token'))
    }
  },
  created () {
    this.checklogin()
  },
  methods: {
    checklogin () {
      let username = localStorage.getItem('username')
      if (!username) {
        this.$store.commit('changeStatusFalse')
      } else {
        this.$store.commit('changeStatusTrue')
        this.$store.dispatch('getAllPosts', localStorage.getItem('token'))
      }
    },
    addPost () {
      let formData = new FormData()
      formData.append('img', this.file)
      formData.append('header', this.post_header)
      formData.append('postText', this.post_content)
      formData.append('username', localStorage.getItem('username'))
      let postInput = {
        token: localStorage.getItem('token'),
        data: formData
      }
      this.$store.dispatch('addNewPost', postInput)
      this.reset()
    },
    onFilePicked () {
      this.file = this.$refs.file.files[0]
    },
    onFilePickedUpdate () {
      this.file = this.$refs.fileUpdate.files[0]
    },
    reset () {
      this.post_content = ''
      this.post_header = ''
      this.post_id = ''
    },
    deletePost (id) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this Post!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            let deleteData = {
              token: localStorage.getItem('token'),
              id: id
            }
            this.$store.dispatch('deletePost', deleteData)
          }
        })
    },
    updatePost (id) {
      let formData = new FormData()
      formData.append('img', this.file)
      formData.append('header', this.post_header)
      formData.append('postText', this.post_content)
      let updateData = {
        data: formData,
        token: localStorage.getItem('token'),
        id: id
      }
      this.$store.dispatch('updatePost', updateData)
      this.reset()
    },
    setForUpdate (index) {
      this.post_header = this.posts[index].header
      this.post_content = this.posts[index].post_text
      this.post_id = this.posts[index]._id
    }
  }
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
  margin: 3%
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
.postHeader {
  margin: 3%
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
